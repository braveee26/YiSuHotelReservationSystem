const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get all hotels (with images and min price)
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('hotel')
        .select(`
            *,
            hotel_image(image_url, sort_order),
            room_type(price)
        `)
        .eq('online_status', 'online')
        .eq('audit_status', 'approved')
        .order('hotel_id', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    // Transform data to include min_price and primary image
    const transformedData = data.map(hotel => ({
        ...hotel,
        min_price: hotel.room_type?.length > 0
            ? Math.min(...hotel.room_type.map(r => Number(r.price)))
            : null,
        primary_image: hotel.hotel_image?.sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url || null
    }));

    res.json(transformedData);
});

// Get all hotel attributes (for hot tags)
router.get('/attributes', async (req, res) => {
    const { data, error } = await supabase
        .from('hotel_attribute')
        .select('*')
        .order('attr_id', { ascending: true });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Get 5 random recommended hotels
router.get('/recommend', async (req, res) => {
    try {
        // Fetch a pool of active hotels
        const { data, error } = await supabase
            .from('hotel')
            .select(`
                *,
                hotel_image(image_url, sort_order),
            room_type(price)
        `)
            .eq('online_status', 'online')
            .eq('audit_status', 'approved');

        if (error) throw error;

        // Randomly shuffle and take 5
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        // Transform data
        const transformedData = selected.map(hotel => ({
            ...hotel,
            min_price: hotel.room_type?.length > 0
                ? Math.min(...hotel.room_type.map(r => Number(r.price)))
                : null,
            primary_image: hotel.hotel_image?.sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url || null
        }));

        res.json(transformedData);
    } catch (error) {
        console.error('[Recommend API] Error:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// Search hotels with advanced filters (stars, tags, etc.)
router.get('/search', async (req, res) => {
    const { keyword, city, stars, tags } = req.query;

    let query = supabase
        .from('hotel')
        .select(`
            *,
            hotel_image(image_url, sort_order),
            room_type(price)
        `)
        .eq('online_status', 'online')
        .eq('audit_status', 'approved');

    // Filter by city
    if (city) {
        query = query.eq('city', city);
    }

    // Filter by stars
    if (stars) {
        query = query.eq('star_level', Number(stars));
    }

    // Filter by tags (multiple attributes)
    if (tags) {
        const tagList = Array.isArray(tags) ? tags : [tags];
        // 假设标签可能是由逗号分隔存储在某些字段，或者匹配周边设施描述
        // 这里采用简单的 or 匹配作为示例逻辑
        const tagFilters = tagList.map(tag => `detail_address.ilike.%${tag}%`).join(',');
        if (tagFilters) query = query.or(tagFilters);
    }

    // Filter by keyword (search in hotel name, attractions, and mall info)
    if (keyword) {
        query = query.or(`hotel_name_cn.ilike.%${keyword}%,nearby_attractions.ilike.%${keyword}%,mall_info.ilike.%${keyword}%`);
    }

    const { data, error } = await query.order('hotel_id', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    // Transform data
    const transformedData = data.map(hotel => ({
        ...hotel,
        min_price: hotel.room_type?.length > 0
            ? Math.min(...hotel.room_type.map(r => Number(r.price)))
            : null,
        primary_image: hotel.hotel_image?.sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url || null
    }));

    res.json(transformedData);
});

// Get search suggestions (Smart search for hotels, attractions, malls)
router.get('/search/suggestions', async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) return res.json([]);

    try {
        const { data, error } = await supabase
            .from('hotel')
            .select('hotel_name_cn, nearby_attractions, mall_info, city, detail_address')
            .or(`hotel_name_cn.ilike.%${keyword}%,nearby_attractions.ilike.%${keyword}%,mall_info.ilike.%${keyword}%`)
            .limit(20);

        if (error) throw error;

        const results = [];
        const seen = new Set();

        data.forEach(item => {
            // Check hotel name
            if (item.hotel_name_cn?.toLowerCase().includes(keyword.toLowerCase()) && !seen.has(`h-${item.hotel_name_cn}`)) {
                results.push({ name: item.hotel_name_cn, type: '酒店', subText: item.detail_address });
                seen.add(`h-${item.hotel_name_cn}`);
            }
            // Check attractions
            if (item.nearby_attractions) {
                item.nearby_attractions.split(/[，,;；]/).forEach(attr => {
                    const trimmed = attr.trim();
                    if (trimmed.toLowerCase().includes(keyword.toLowerCase()) && !seen.has(`a-${trimmed}`)) {
                        results.push({ name: trimmed, type: '景点', subText: `${item.city}周边` });
                        seen.add(`a-${trimmed}`);
                    }
                });
            }
            // Check mall info
            if (item.mall_info) {
                item.mall_info.split(/[，,;；]/).forEach(mall => {
                    const trimmed = mall.trim();
                    if (trimmed.toLowerCase().includes(keyword.toLowerCase()) && !seen.has(`m-${trimmed}`)) {
                        results.push({ name: trimmed, type: '商场', subText: `${item.city}周边` });
                        seen.add(`m-${trimmed}`);
                    }
                });
            }
        });

        res.json(results.slice(0, 15));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('hotel')
        .select('*, hotel_image(*), room_type(*)')
        .eq('hotel_id', id)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Create hotel (Merchant only)
router.post('/', async (req, res) => {
    const hotelData = req.body;
    const { data, error } = await supabase
        .from('hotel')
        .insert([hotelData])
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

module.exports = router;
