const users = require('../models/userModel')
const jwt = require('jsonwebtoken');

// register
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password } = req.body
    console.log(username, email, password);

    //check email is  present in mongodb
    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json("Account already exists. Please login")
        } else {
            const newUser = new users({
                username, email, password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.loginController = async (req, res) => {
    console.log("inside loginController");
    const { email, password } = req.body
    console.log(email, password);
    //check if email and password is  present in user model
    try {
        const existingUser = await users.findOne({ email, password })
        console.log(existingUser);
        if (existingUser) {
            //allow login
            //generate token using jwt
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
            res.status(200).json({
                user: existingUser,
                token
            })
        } else {
            //invalid credentials
            res.status(404).json("Invalid Login Credentials")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}