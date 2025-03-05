const mongoose = require('mongoose');

const Interactions = new mongoose.Schema({
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MerchantData',
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    interactionType: {
        type: String,
        required: true,
    },
    interactionTitle: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
    },
    followUpDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        default: 'Open',
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const InteractionData = mongoose.model('InteractionData', Interactions);

module.exports = InteractionData;
