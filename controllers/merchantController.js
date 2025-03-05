const MerchantData = require('../models/Merchant.js');
const mongoose=require('mongoose')

const createMerchant = async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'Merchant name is required' });

    try {
        const newMerchant = new MerchantData({ name });
        await newMerchant.save();
        res.status(201).json({ message: 'Merchant added successfully', merchant: newMerchant });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add merchant', error: err.message || err });
    }
};

const getMerchants = async (req, res) => {
    try {
        const merchants = await MerchantData.find();
        res.status(200).json(merchants);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const getMerchantByID = async (req, res) => {
    const { id } = req.params;

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid merchant ID' });
    }

    try {
        const merchant = await MerchantData.findById(id);

        // If merchant is not found
        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }

        res.status(200).json(merchant);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch merchant', error: err.message });
    }
};

module.exports = { createMerchant, getMerchants,getMerchantByID };
