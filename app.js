const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');



const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const conn = require("./config/conn.js")
const UserData = require("./models/User.js")
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
