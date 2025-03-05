// const express = require('express')
// const PORT = process.env.PORT || 5000
// const app = express()
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose=require('mongoose');


// const jwt = require('jsonwebtoken')
// const bcryptjs = require('bcryptjs')

// const conn = require("./config/conn.js")
// const UserData = require("./models/User.js")
// const MerchantData = require("./models/Merchant.js")
// const InteractionData = require("./models/Interaction.js")
// const TaskData = require("./models/Task.js")



// const joi = require('joi')

// app.use(cors());
// app.use(express.json())
// app.use(bodyParser.json());




// const signupuser = joi.object({
//     name: joi.string().min(3).required(),
//     password: joi.string().min(6).required(),
//     email: joi.string().email().required()
// })

// const loginuser = joi.object({
//     email: joi.string().email().required(),
//     password: joi.string().min(6).required(),
// })

// app.post('/interactions', async (req, res) => {
//     const { merchant, businessType, interactionType, interactionTitle, assignedTo, followUpDate, status, description } = req.body;
//     if (!merchant || !businessType || !interactionType || !interactionTitle || !assignedTo || !description) {
//         return res.status(400).json({ message: 'All required fields must be provided' });
//     }
//     try {
//         const newInteraction = new InteractionData({
//             merchant,
//             businessType,
//             interactionType,
//             interactionTitle,
//             assignedTo,
//             followUpDate,
//             status,
//             description
//         });

//         // Save the interaction to the database
//         await newInteraction.save();

//         // Send the response with the newly created interaction data
//         res.status(201).json({
//             message: 'Interaction created successfully',
//             interaction: newInteraction
//         });
//     } catch (err) {
//         // Log error and send failure response
//         console.error(err);
//         res.status(500).json({
//             message: 'Failed to create interaction',
//             error: err.message || err
//         });
//     }
// });

// app.get('/interactions', async (req, res) => {
//     const { merchant, status, interactionType, assignedTo } = req.query;

//     try {
//         // Build filter object based on query parameters
//         const filter = {};

//         if (merchant) {
//             filter.merchant = mongoose.Types.ObjectId(merchant); // Ensure merchant is a valid ObjectId
//         }
//         if (status) {
//             filter.status = status;
//         }
//         if (interactionType) {
//             filter.interactionType = interactionType;
//         }
//         if (assignedTo) {
//             filter.assignedTo = assignedTo;
//         }

//         // Fetch interactions from the database based on the filter
//         const interactions = await InteractionData.find(filter).populate('merchant', 'name');

//         // Send the response with the list of interactions
//         res.status(200).json({
//             message: 'Interactions fetched successfully',
//             interactions: interactions
//         });
//     } catch (err) {
//         // Log error and send failure response
//         console.error(err);
//         res.status(500).json({
//             message: 'Failed to fetch interactions',
//             error: err.message || err
//         });
//     }
// });

// app.get('/interactions/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Validate if ID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'Invalid interaction ID' });
//         }

//         // Fetch the interaction from the database
//         const interaction = await InteractionData.findById(id).populate('merchant', 'name');

//         // If the interaction is not found, send a 404 response
//         if (!interaction) {
//             return res.status(404).json({ message: 'Interaction not found' });
//         }

//         // Send the response with the interaction data
//         res.status(200).json({
//             message: 'Interaction fetched successfully',
//             interaction: interaction
//         });
//     } catch (err) {
//         // Log error and send failure response
//         console.error(err);
//         res.status(500).json({
//             message: 'Failed to fetch interaction',
//             error: err.message || err
//         });
//     }
// });

// app.post('/merchants', async (req, res) => {
//     const { name } = req.body;

//     if (!name) {
//         return res.status(400).json({ message: 'Merchant name is required' });
//     }

//     try {
//         const newMerchant = new MerchantData({ name });
//         await newMerchant.save();
//         res.status(201).json({ message: 'Merchant added successfully', merchant: newMerchant });
//     } catch (err) {
//         console.error(err); // Log the error details to the console
//         res.status(500).json({ message: 'Failed to add merchant', error: err.message || err });
//     }
// });
// app.get('/merchants', async (req, res) => {
//     try {
//         const merchants = await MerchantData.find();
//         res.status(200).json(merchants);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err });
//     }
// });

// app.post('/tasks', async (req, res) => {
//     const { merchant, businessType, assignedTo, followUpDate, status, taskTitle, taskDescription, reminderDate, reminderTime } = req.body;

//     // Check if all required fields are provided
//     if (!merchant || !businessType || !assignedTo || !followUpDate || !status || !taskTitle) {
//         return res.status(400).json({ message: 'All required fields must be provided' });
//     }

//     try {
//         // Create a new task
//         const newTask = new TaskData({
//             merchant,
//             businessType,
//             assignedTo,
//             followUpDate,
//             status,
//             taskTitle,
//             taskDescription,
//             reminderDate,
//             reminderTime
//         });

//         // Save the task to the database
//         await newTask.save();

//         // Send the response
//         res.status(201).json({ message: 'Task created successfully', task: newTask });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to create task', error: err.message });
//     }
// });

// // GET API to fetch all tasks
// app.get('/tasks', async (req, res) => {
//     const { merchant, status, assignedTo, businessType } = req.query;

//     try {
//         const filter = {};

//         if (merchant) {
//             filter.merchant = mongoose.Types.ObjectId(merchant); 
//         }
//         if (status) {
//             filter.status = status;
//         }
//         if (assignedTo) {
//             filter.assignedTo = assignedTo;
//         }
//         if (businessType) {
//             filter.businessType = businessType;
//         }

//         // Fetch tasks from the database based on the filter
//         const tasks = await TaskData.find(filter).populate('merchant', 'name');

//         // Send the response with the list of tasks
//         res.status(200).json({
//             message: 'Tasks fetched successfully',
//             tasks: tasks
//         });
//     } catch (err) {
//         // Log error and send failure response
//         console.error(err);
//         res.status(500).json({
//             message: 'Failed to fetch tasks',
//             error: err.message || err
//         });
//     }
// });


// app.get('/tasks/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Validate if the ID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'Invalid task ID' });
//         }

//         // Fetch the task from the database by its ID
//         const task = await TaskData.findById(id).populate('merchant', 'name'); // Optionally populate merchantId to show merchant name

//         // If task is not found
//         if (!task) {
//             return res.status(404).json({ message: 'Task not found' });
//         }

//         // Send the task data
//         res.status(200).json({ message: 'Task fetched successfully', task });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to fetch task', error: err.message });
//     }
// });

// app.post("/signup", async (req, res) => {
//     const { name, email, password } = req.body;

//     const { error } = signupuser.validate(req.body)
//     if (error) {
//         return res.status(400).json({ message: error.details[0].message })
//     }

//     console.log(name, email, password);
//     try {
//         let newUser = await UserData.findOne({ email })
//         if (newUser) {
//             return res.status(400).json({ message: "User already exists" })
//         }

//         const securePassword = await bcryptjs.hash(password, 10)
//         newUser = await UserData.create({
//             name: name,
//             email: email,
//             password: securePassword,
//         })

//         const webtoken = {
//             tokenuser: {
//                 _id: newUser._id
//             }
//         }

//         const authToken = jwt.sign(webtoken, "HarshTanisha")
//         return res.status(200).json({ message: "Signup Successful", authToken })

//     } catch (error) {
//         console.error(`Error : ${error}`);
//         return res.status(500).json({ message: "Internal server error" })
//     }
// })

// app.post("/login", async (req, res) => {
//     const { email, password } = req.body

//     const { error } = loginuser.validate(req.body)
//     if (error) {
//         return res.status(400).json({ message: error.details[0].message })
//     }

//     try {
//         const user = await UserData.findOne({ email })
//         if (!user) {
//             return res.status(401).json({ message: "Invalid email or password" })
//         }

//         const isMatchPassword = await bcryptjs.compare(password, user.password)
//         if (!isMatchPassword) {
//             return res.status(401).json({ message: "Invalid email or password" })
//         }

//         const webtoken = {
//             tokenuser: {
//                 _id: user._id
//             }
//         }

//         const authToken = jwt.sign(webtoken, "HarshTanisha")
//         return res.status(200).json({ message: "Login Successful", authToken })

//     } catch (error) {
//         console.error(`Error is : ${error}`);
//         return res.status(500).json({ message: "Internal server error" })
//     }
// })

// app.get("/test", (req, res) => {
//     res.send("All fine homepage")
// })

// // Global error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).json({ message: "Something went wrong!" })
// })

// app.listen(PORT, () => {
//     conn();
//     console.log(`Listening at port ${PORT}`)
// })























const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');


const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const conn = require("./config/conn.js")
const UserData = require("./models/User.js")
const MerchantData = require("./models/Merchant.js")
const InteractionData = require("./models/Interaction.js")
const TaskData = require("./models/Task.js")
const merchantRoutes = require('./routes/merchantRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const taskRoutes = require('./routes/taskRoutes');



const joi = require('joi')

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());




const signupuser = joi.object({
    name: joi.string().min(3).required(),
    password: joi.string().min(6).required(),
    email: joi.string().email().required()
})

const loginuser = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

// app.post('/interactions', async (req, res) => {
//     const { merchant, businessType, interactionType, interactionTitle, assignedTo, followUpDate, status, description } = req.body;
//     if (!merchant || !businessType || !interactionType || !interactionTitle || !assignedTo || !description) {
//         return res.status(400).json({ message: 'All required fields must be provided' });
//     }
//     try {
//         const newInteraction = new InteractionData({
//             merchant,
//             businessType,
//             interactionType,
//             interactionTitle,
//             assignedTo,
//             followUpDate,
//             status,
//             description
//         });

//         // Save the interaction to the database
//         await newInteraction.save();

//         // Send the response with the newly created interaction data
//         res.status(201).json({
//             message: 'Interaction created successfully',
//             interaction: newInteraction
//         });
//     } catch (err) {
//         // Log error and send failure response
//         console.error(err);
//         res.status(500).json({
//             message: 'Failed to create interaction',
//             error: err.message || err
//         });
//     }
// });

// app.get('/interactions', async (req, res) => {
//     const { merchant, status, interactionType, assignedTo } = req.query;

//     try {
//         // Build filter object based on query parameters
//         const filter = {};

//         if (merchant) {
//             filter.merchant = mongoose.Types.ObjectId(merchant); // Ensure merchant is a valid ObjectId
//         }
//         if (status) {
//             filter.status = status;
//         }
//         if (interactionType) {
//             filter.interactionType = interactionType;
//         }
//         if (assignedTo) {
//             filter.assignedTo = assignedTo;
//         }

//         // Fetch interactions from the database based on the filter
//         const interactions = await InteractionData.find(filter).populate('merchant', 'name');

//         // Send the response with the list of interactions
//         res.status(200).json({
//             message: 'Interactions fetched successfully',
//             interactions: interactions
//         });
//     } catch (err) {
//         // Log error and send failure response
//         console.error(err);
//         res.status(500).json({
//             message: 'Failed to fetch interactions',
//             error: err.message || err
//         });
//     }
// });

// app.get('/interactions/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Validate if ID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'Invalid interaction ID' });
//         }

//         // Fetch the interaction from the database
//         const interaction = await InteractionData.findById(id).populate('merchant', 'name');

//         // If the interaction is not found, send a 404 response
//         if (!interaction) {
//             return res.status(404).json({ message: 'Interaction not found' });
//         }

//         // Send the response with the interaction data
//         res.status(200).json({
//             message: 'Interaction fetched successfully',
//             interaction: interaction
//         });
//     } catch (err) {
//         // Log error and send failure response
//         console.error(err);
//         res.status(500).json({
//             message: 'Failed to fetch interaction',
//             error: err.message || err
//         });
//     }
// });

// app.post('/merchants', async (req, res) => {
//     const { name } = req.body;

//     if (!name) {
//         return res.status(400).json({ message: 'Merchant name is required' });
//     }

//     try {
//         const newMerchant = new MerchantData({ name });
//         await newMerchant.save();
//         res.status(201).json({ message: 'Merchant added successfully', merchant: newMerchant });
//     } catch (err) {
//         console.error(err); // Log the error details to the console
//         res.status(500).json({ message: 'Failed to add merchant', error: err.message || err });
//     }
// });
// app.get('/merchants', async (req, res) => {
//     try {
//         const merchants = await MerchantData.find();
//         res.status(200).json(merchants);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err });
//     }
// });

// app.post('/tasks', async (req, res) => {
//     const { merchant, businessType, assignedTo, followUpDate, status, taskTitle, taskDescription, reminderDate, reminderTime } = req.body;

//     // Check if all required fields are provided
//     if (!merchant || !businessType || !assignedTo || !followUpDate || !status || !taskTitle) {
//         return res.status(400).json({ message: 'All required fields must be provided' });
//     }

//     try {
//         // Create a new task
//         const newTask = new TaskData({
//             merchant,
//             businessType,
//             assignedTo,
//             followUpDate,
//             status,
//             taskTitle,
//             taskDescription,
//             reminderDate,
//             reminderTime
//         });

//         // Save the task to the database
//         await newTask.save();

//         // Send the response
//         res.status(201).json({ message: 'Task created successfully', task: newTask });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to create task', error: err.message });
//     }
// });

// // GET API to fetch all tasks
// app.get('/tasks', async (req, res) => {
//     const { merchant, status, assignedTo, businessType } = req.query;

//     try {
//         const filter = {};

//         if (merchant) {
//             filter.merchant = mongoose.Types.ObjectId(merchant); 
//         }
//         if (status) {
//             filter.status = status;
//         }
//         if (assignedTo) {
//             filter.assignedTo = assignedTo;
//         }
//         if (businessType) {
//             filter.businessType = businessType;
//         }

//         // Fetch tasks from the database based on the filter
//         const tasks = await TaskData.find(filter).populate('merchant', 'name');

//         // Send the response with the list of tasks
//         res.status(200).json({
//             message: 'Tasks fetched successfully',
//             tasks: tasks
//         });
//     } catch (err) {
//         // Log error and send failure response
//         console.error(err);
//         res.status(500).json({
//             message: 'Failed to fetch tasks',
//             error: err.message || err
//         });
//     }
// });


// app.get('/tasks/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Validate if the ID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'Invalid task ID' });
//         }

//         // Fetch the task from the database by its ID
//         const task = await TaskData.findById(id).populate('merchant', 'name'); // Optionally populate merchantId to show merchant name

//         // If task is not found
//         if (!task) {
//             return res.status(404).json({ message: 'Task not found' });
//         }

//         // Send the task data
//         res.status(200).json({ message: 'Task fetched successfully', task });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to fetch task', error: err.message });
//     }
// });

app.use('/api', merchantRoutes);
app.use('/api', interactionRoutes);
app.use('/api', taskRoutes);


app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = signupuser.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    console.log(name, email, password);
    try {
        let newUser = await UserData.findOne({ email })
        if (newUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const securePassword = await bcryptjs.hash(password, 10)
        newUser = await UserData.create({
            name: name,
            email: email,
            password: securePassword,
        })

        const webtoken = {
            tokenuser: {
                _id: newUser._id
            }
        }

        const authToken = jwt.sign(webtoken, "HarshTanisha")
        return res.status(200).json({ message: "Signup Successful", authToken })

    } catch (error) {
        console.error(`Error : ${error}`);
        return res.status(500).json({ message: "Internal server error" })
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body

    const { error } = loginuser.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    try {
        const user = await UserData.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isMatchPassword = await bcryptjs.compare(password, user.password)
        if (!isMatchPassword) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const webtoken = {
            tokenuser: {
                _id: user._id
            }
        }

        const authToken = jwt.sign(webtoken, "HarshTanisha")
        return res.status(200).json({ message: "Login Successful", authToken })

    } catch (error) {
        console.error(`Error is : ${error}`);
        return res.status(500).json({ message: "Internal server error" })
    }
})

app.get("/test", (req, res) => {
    res.send("All fine homepage")
})

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: "Something went wrong!" })
})

app.listen(PORT, () => {
    conn();
    console.log(`Listening at port ${PORT}`)
})

























