const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/authMiddleware');
const { sendContactEmails } = require('../utils/emailService');

// @route   POST /api/messages
// @desc    Send a message
// @access  Public
router.post('/messages', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Save to database
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();

        // Send professional emails
        try {
            await sendContactEmails(name, email, subject, message);
        } catch (emailError) {
            console.error('Failed to send emails:', emailError);
            // We don't fail the request if email fails, but we saved the message
        }

        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   POST /api/contact
// @desc    Alias for Send a message
// @access  Public
router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();

        try {
            await sendContactEmails(name, email, subject, message);
        } catch (emailError) {
            console.error('Failed to send emails (contact):', emailError);
        }

        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});


// @route   GET /api/messages
// @desc    Get all messages
// @access  Private/Admin
router.get('/messages', protect, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/messages/:id
// @desc    Delete a message
// @access  Private/Admin
router.delete('/messages/:id', protect, async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
