const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        requires: true
    },
    password: {
        type: String,
        requires: true
    },
    github: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    profilepic: {
        type: String,
    },
})

const users = mongoose.model("users", userSchema)

module.exports = users