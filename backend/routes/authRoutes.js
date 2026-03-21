const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin Login (Password Only)
router.post('/login', async (req, res) => {
    const { password } = req.body;
    console.log(`[AUTH] Attempt with password: ${password}`);
    try {
        if (password === 'S2World') {
            const admin = await Admin.findOne().catch(() => null);
            const adminId = admin ? admin._id : '000000000000000000000000';
            const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '30d' });
            console.log(`[AUTH] Success! Token issued.`);
            res.json({ token });
        } else {
            console.log(`[AUTH] Failed: Invalid password.`);
            res.status(401).json({ message: 'INVALID_PASSWORD' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
