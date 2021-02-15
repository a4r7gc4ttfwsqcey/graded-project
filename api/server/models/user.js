const { Int32 } = require('bson')
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required for User'],
        maxlength: [32, 'Username cannot exceed 32 characters'],
        minlength: [4, 'Username must be more than 4 characters'],
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required for User'],
        maxlength: [32, 'Username cannot exceed 64 characters'],
        minlength: [4, 'Username must be more than 8 characters']
    }
},{
    timestamps: true
})

const User = mongoose.model('user', userSchema)

exports = User