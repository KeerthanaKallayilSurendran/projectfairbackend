const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
// register

exports.registerController = async (req, res) => {
    console.log("Inside Register Controller");
    console.log(req.body);
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Already registered.. Please Login!!!")
        } else {
            const newUser = new users({
                username, email, password, github: "", linkedin: "", profilepic: ""
            })
            // to store in mongodb
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(err)
    }


}

// login
exports.loginController = async (req, res) => {
    console.log("Inside Login Controller");
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
            res.status(200).json({
                user: existingUser, token
            })
        } else {
            res.status(404).json("Incorrect Email/Password!!!")
        }
    } catch (error) {
        res.status(401).json(error)
    }


}

// profile updation

