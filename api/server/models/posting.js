const mongoose = require('mongoose')

const postingSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true],
        index: true
    },
    username: {
        type: String,
        required: [true],
        index: true
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
        data: Buffer, contentType: String
    },
    image2: {
        data: Buffer, contentType: String
    },
    image3: {
        data: Buffer, contentType: String
    },
    image4: {
        data: Buffer, contentType: String
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