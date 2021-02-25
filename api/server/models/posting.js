const mongoose = require('mongoose')

const postingSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true],
        index: true
    },
    username: {
        type: String,
        required: [true],
    },
    title: {
        type: String,
        required: [true]
    },
    desc: {
        type: String,
        required: [true]
    },
    category: {
        type: String,
        required: [true]
    },
    location: {
        type: String,
        required: [true]
    },
    image1: {
        type: String
    },
    image2: {
        type: String
    },
    image3: {
        type: String
    },
    image4: {
        type: String
    },
    price: {
        type: Number,
        required: [true]
    },
    type: {
        type: Boolean,
        required: [true]
    },
    contact: {
        type: String,
        required: [true]
    }
},{
    timestamps: true
})


const Posting = mongoose.model('posting', postingSchema)

module.exports = Posting