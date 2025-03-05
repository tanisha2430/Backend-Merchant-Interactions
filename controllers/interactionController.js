const InteractionData = require('../models/Interaction.js');
const mongoose = require('mongoose');

const createInteraction = async (req, res) => {
    const { merchant, businessType, interactionType, interactionTitle, assignedTo, followUpDate, status, description } = req.body;
    
    if (!merchant || !businessType || !interactionType || !interactionTitle || !assignedTo || !description) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    try {
        const newInteraction = new InteractionData({
            merchant,
            businessType,
            interactionType,
            interactionTitle,
            assignedTo,
            followUpDate,
            status,
            description
        });

        await newInteraction.save();

        res.status(201).json({
            message: 'Interaction created successfully',
            interaction: newInteraction
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to create interaction',
            error: err.message || err
        });
    }
};

const getInteractions = async (req, res) => {
    const { merchant, status, interactionType, assignedTo } = req.query;
    const filter = {};

    if (merchant) filter.merchant = mongoose.Types.ObjectId(merchant);
    if (status) filter.status = status;
    if (interactionType) filter.interactionType = interactionType;
    if (assignedTo) filter.assignedTo = assignedTo;

    try {
        const interactions = await InteractionData.find(filter).populate('merchant', 'name');
        res.status(200).json({
            message: 'Interactions fetched successfully',
            interactions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to fetch interactions',
            error: err.message || err
        });
    }
};

const getInteractionByID= async (req, res) => {
    const { id } = req.params;

    try {
        // Validate if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid interaction ID' });
        }

        // Fetch the interaction from the database
        const interaction = await InteractionData.findById(id).populate('merchant', 'name');

        // If the interaction is not found, send a 404 response
        if (!interaction) {
            return res.status(404).json({ message: 'Interaction not found' });
        }

        // Send the response with the interaction data
        res.status(200).json({
            message: 'Interaction fetched successfully',
            interaction: interaction
        });
    } catch (err) {
        // Log error and send failure response
        console.error(err);
        res.status(500).json({
            message: 'Failed to fetch interaction',
            error: err.message || err
        });
    }
}

module.exports = { createInteraction, getInteractions,getInteractionByID };
