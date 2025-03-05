const TaskData = require('../models/Task.js');
const mongoose = require('mongoose');
const MerchantData=require('../models/Merchant.js')
const { getMerchants } = require('../controllers/merchantController');


const createTask=async (req, res) => {
    const { merchant, businessType, assignedTo, followUpDate, status, taskTitle, taskDescription, reminderDate, reminderTime } = req.body;

    // Check if all required fields are provided
    if (!merchant || !businessType || !assignedTo || !followUpDate || !status || !taskTitle) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    try {
        // Create a new task
        const newTask = new TaskData({
            merchant,
            businessType,
            assignedTo,
            followUpDate,
            status,
            taskTitle,
            taskDescription,
            reminderDate,
            reminderTime
        });

        // Save the task to the database
        await newTask.save();

        // Send the response
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create task', error: err.message });
    }
}


const getTasks=async (req, res) => {
    const { merchant, status, assignedTo, businessType } = req.body;
    try {
        const filter = {};
        if (merchant) {
            filter.merchant =new mongoose.Types.ObjectId(merchant);
        }
        if (status) {
            filter.status = status;
        }
        if (assignedTo) {
            filter.assignedTo = assignedTo;
        }
        if (businessType) {
            filter.businessType = businessType;
        }

        // Fetch tasks from the database based on the filter
        const tasks = await TaskData.find(filter).populate('merchant', 'name');

        // Send the response with the list of tasks
        res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks: tasks
        });
    } catch (err) {
        // Log error and send failure response
        console.error(err);
        res.status(500).json({
            message: 'Failed to fetch tasks',
            error: err.message || err
        });
    }
}


const getTasksByID= async (req, res) => {
    const { id } = req.params;

    try {
        // Validate if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }

        // Fetch the task from the database by its ID
        const task = await TaskData.findById(id).populate('merchant', 'name'); // Optionally populate merchantId to show merchant name

        // If task is not found
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Send the task data
        res.status(200).json({ message: 'Task fetched successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch task', error: err.message });
    }
}

module.exports = { createTask, getTasks,getTasksByID };
