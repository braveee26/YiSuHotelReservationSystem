const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

// User Registration
router.post('/register', async (req, res) => {
    const { phone, password, role } = req.body;
    console.log(`\n--- [Register Start] --- Phone: ${phone}`);

    if (!phone || !password) {
        console.log('[Register] Validation Failed: Missing fields');
        return res.status(400).json({ error: 'Phone and password are required' });
    }

    try {
        console.log('[Register] Step 1: Generating salt...');
        const saltBuffer = await bcrypt.genSalt(10);
        console.log('[Register] Step 2: Hashing password...');
        const hashedPassword = await bcrypt.hash(password, saltBuffer);
        console.log('[Register] Step 3: Hash complete');

        console.log('[Register] Step 4: Supabase insert initiating...');
        // Correcting default role to 'customer' as per latest requirements
        const roleValue = (role === 1 || role === '1' || role === 'admin') ? 'admin' :
            (role === 'merchant') ? 'merchant' : 'customer';

        const { data, error } = await supabase
            .from('user')
            .insert([{
                user_name: phone,
                password: hashedPassword,
                phone,
                salt: saltBuffer,
                role: roleValue,
                is_active: true // New users are active by default
            }])
            .select();

        if (error) {
            console.error('[Register] Supabase Error:', error.message);
            return res.status(400).json({ error: error.message });
        }

        console.log('[Register] Step 5: Success! User ID:', data[0]?.user_id);
        res.status(201).json({ message: 'Registration successful', user: data[0] });
    } catch (err) {
        console.error('[Register] CRITICAL EXCEPTION:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// User Login (Supports Password and Code)
router.post('/login', async (req, res) => {
    const { phone, password, code, method } = req.body;
    console.log(`\n--- [Login Start] --- Phone: ${phone}, Method: ${method}`);

    if (!phone) return res.status(400).json({ error: 'Phone is required' });

    try {
        console.log('[Login] Step 1: Fetching user...');
        const { data: user, error } = await supabase
            .from('user')
            .select('*')
            .eq('phone', phone)
            .single();

        if (error || !user) {
            console.log('[Login] User lookup failed/not found');
            return res.status(401).json({ error: 'User not found' });
        }

        if (method === 'code') {
            console.log('[Login] Step 2 (Code): Verifying...');
            if (code !== '123456') {
                return res.status(401).json({ error: 'Invalid verification code' });
            }
        } else {
            console.log('[Login] Step 2 (Pass): Comparing hash...');
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log('[Login] Password mismatch');
                return res.status(401).json({ error: 'Invalid password' });
            }
        }

        // Account Activation Check
        if (user.is_active === false) {
            console.log(`[Login] Access Denied: Account ${user.user_name} is disabled.`);
            return res.status(403).json({
                error: '账号已被禁用',
                message: '您的账号已被管理员禁用，请联系客服。'
            });
        }

        // APP Role Access Control: Only allow 'customer'
        if (user.role !== 'customer') {
            console.log(`[Login] Access Denied: Role ${user.role} is not permitted on APP.`);
            return res.status(403).json({
                error: '权限不足',
                message: 'APP 端仅限客户登录，商家或管理员请使用管理后台。'
            });
        }

        delete user.password;
        delete user.salt;

        console.log('[Login] Step 3: Success!');
        res.json({ message: 'Login successful', user: user });
    } catch (err) {
        console.error('[Login] CRITICAL EXCEPTION:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Update profile
router.put('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const { real_name, email, avatar } = req.body;
    console.log(`[Profile Update] User: ${id}, Data:`, { real_name, email });

    try {
        const { data, error } = await supabase
            .from('user')
            .update({
                real_name: real_name,
                email: email,
                avatar: avatar
            })
            .eq('user_id', id)
            .select('user_id, user_name, role, avatar, real_name, phone, email, id_card')
            .single();

        if (error) {
            console.error('[Profile Update] Error:', error.message);
            return res.status(400).json({ error: error.message });
        }

        console.log('[Profile Update] Success for:', id);
        res.json({ message: 'Profile updated successfully', user: data });
    } catch (err) {
        console.error('[Profile Update] Exception:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Update profile, profile by ID, etc... (Keeping other existing routes)
router.get('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('user').select('user_id, user_name, role, avatar, real_name, phone, email, id_card').eq('user_id', id).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

module.exports = router;
