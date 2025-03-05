const mongoose = require('mongoose');

const Tasks = new mongoose.Schema({
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MerchantData', 
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
    },
    followUpDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        required: true,
    },
    taskTitle: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
    },
    reminderDate: {
        type: Date,
    },
    reminderTime: {
        type: String,
    },
}, { timestamps: true });

const TaskData = mongoose.model('TaskData', Tasks);

module.exports = TaskData;
