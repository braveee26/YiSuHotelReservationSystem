const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get all hotels
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('hotel')
        .select('*')
        .eq('online_status', 1)
        .eq('audit_status', 2);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('hotel')
        .select('*, hotel_image(*)')
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
