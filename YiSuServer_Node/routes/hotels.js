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
        .eq('online_status', 1)
        .eq('audit_status', 2)
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

// Search hotels
router.get('/search', async (req, res) => {
    const { keyword, city } = req.query;
    
    let query = supabase
        .from('hotel')
        .select(`
            *,
            hotel_image(image_url, sort_order),
            room_type(price)
        `)
        .eq('online_status', 1)
        .eq('audit_status', 2);
    
    // Filter by city if provided
    if (city) {
        query = query.eq('city', city);
    }
    
    // Filter by keyword (search in hotel name)
    if (keyword) {
        query = query.or(`hotel_name_cn.ilike.%${keyword}%,hotel_name_en.ilike.%${keyword}%`);
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
