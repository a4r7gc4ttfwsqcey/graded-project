const bcrypt = require('bcrypt')
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
        required: [true, 'Password is required for User']
    }
},{
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if (! this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
  });

const User = mongoose.model('user', userSchema)

module.exports = User