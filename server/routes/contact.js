const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); 

router.post('/submit', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

       
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: "Please fill in all required fields." 
            });
        }

        
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        
        await newContact.save();

        res.status(201).json({ 
            success: true, 
            message: "Message stored successfully in AgriPool database!" 
        });

    } catch (error) {
        console.error("Backend Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Server Error. Please try again later." 
        });
    }
});

module.exports = router;