const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get rooms by hotel ID
router.get('/hotel/:hotelId', async (req, res) => {
    const { hotelId } = req.params;
    const { data, error } = await supabase
        .from('room_type')
        .select('*, room_image(*)')
        .eq('hotel_id', hotelId);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Get room by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('room_type')
        .select('*')
        .eq('room_id', id)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

module.exports = router;
