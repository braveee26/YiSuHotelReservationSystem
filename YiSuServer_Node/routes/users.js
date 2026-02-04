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
    res.status(201).json(data);
});

// User Login (Simplified)
router.post('/login', async (req, res) => {
    const { user_name, password } = req.body;
    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('user_name', user_name)
        .eq('password', password)
        .single();

    if (error || !data) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user: data });
});

module.exports = router;
