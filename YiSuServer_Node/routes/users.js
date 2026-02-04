const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// User Registration
router.post('/register', async (req, res) => {
    const { user_name, password, phone, role } = req.body;
    // Note: In a real app, hash password here
    const { data, error } = await supabase
        .from('user')
        .insert([{ user_name, password, phone, role, salt: 'default_salt' }])
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data[0]);
});

// User Login (Simplified)
router.post('/login', async (req, res) => {
    const { user_name, password } = req.body;
    const { data, error } = await supabase
        .from('user')
        .select('user_id, user_name, role, avatar, real_name, phone, email, id_card, create_time')
        .eq('user_name', user_name)
        .eq('password', password)
        .single();

    if (error || !data) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Return user object directly (without password/salt)
    res.json({ 
        message: 'Login successful', 
        user: data 
    });
});

// Get user profile by ID
router.get('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('user')
        .select('user_id, user_name, role, avatar, real_name, phone, email, id_card, create_time')
        .eq('user_id', id)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Update user profile
router.put('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const { real_name, email, avatar } = req.body;
    
    const { data, error } = await supabase
        .from('user')
        .update({ real_name, email, avatar })
        .eq('user_id', id)
        .select('user_id, user_name, role, avatar, real_name, phone, email, id_card, create_time')
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

module.exports = router;
