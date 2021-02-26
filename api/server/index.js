require('dotenv').config()
const db = require('./utils/db')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyparser = require('body-parser')
const User = require('./models/user')
const Posting = require('./models/posting')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const auth = require('./middlewares/auth_jwt')
const uuid = require('uuid');
const { startSession } = require('./models/user')

app.use(bodyparser.json())
app.get('/', (req, res) => {
    try{
        return res.status(200).json({
            message: 'OK: API is online'
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Internal Server Error: Unknown error occurred'
        })
    }
})
app.post('/register', async (req, res) => {
        try{
            const user = new User(req.body)
            await user.save()
            return res.status(201).json({
                message: "Created: User account created successfully"
        })
        } catch (e) {
            return res.status(400).json({
                message: 'Bad request: Invalid data'
            })
        }
})
app.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if(user){
            const check = await user.checkPassword(req.body.password)
            if (check) {
                token = jwt.sign(user.username, process.env.JWTSECRET)
                return res.status(200).json({ 
                    auth: token
                })
            } else {
                return res.status(401).json({
                    message: 'Unauthorized: Invalid credentials'
                })
            }
        } else {
            return res.status(400).json({
                message: 'Bad request: Invalid input'
            })
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Internal Server Error: Unknown error occurred'
        })
    }
    
})
app.post('/posting', auth(true), async (req, res) => {
    const rb = req.body
    if (!rb.title || !rb.desc || !rb.category || !rb.location || !rb.image1 || !rb.image2 || !rb.image3 || !rb.image4 || !rb.price || !rb.type || !rb.contact) {
        return res.status(400).json({
            message: 'Bad request: Invalid data'
        })
    } else {
        try {
            const posting = new Posting({
                id: uuid.v4().toString(), 
                username: req.auth,
                title: rb.title,
                desc: rb.desc,
                category: rb.category,
                location: rb.location,
                image1: rb.image1,
                image2: rb.image2,
                image3: rb.image3,
                image4: rb.image4,
                price: rb.price,
                type: rb.type,
                contact: rb.contact
            })
            await posting.save()
            return res.status(201).json({
                message: "Created: Posting created successfully"})
        } catch (e) {
        return res.status(500).json({
            message: 'Internal Server Error: Unknown error occurred'
        })
    }
    }

})
app.get('/postings/:id', async (req, res) => {
    try {
        const id = req.params.id
        const posting = await Posting.findOne({id: req.params.id})
        return res.status(200).json(posting)
    } catch (e) {
        return res.status(500).json({
            message: 'Internal Server Error: Unknown error occurred'
        })
    }
})
app.patch('/postings/:id', auth(true), async (req, res) => {
    try {
        const id = req.params.id
        const posting = await Posting.findOne({id: req.params.id})
        if (req.auth === posting.userId) {
            
            return res.status(200).json({
                message: 'OK: Not implemented'
            })
        } else {
            return res.status(401).json({
                message: 'Unauthorized: Invalid credentials'
            })
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Internal Server Error: Unknown error occurred'
        })
    }
})
app.delete('/postings/:id', auth(true), async (req, res) => {
    try {
        const id = req.params.id
        const posting = await Posting.findOne({id: req.params.id})
        if (req.auth === posting.userId) {
            await Posting.deleteOne({id: req.params.id})
            return res.status(200).json({
                message: 'OK: Deleted'
            })
        } else {
            return res.status(401).json({
                message: 'Unauthorized: Invalid credentials'
            })
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Internal Server Error: Unknown error occurred'
        })
    }
})
app.get('/search', async (req, res) => {
    try {
        if (!req.query.category && !req.query.location && !req.query.date ) {
            const allpostings = await Posting.find({})
            return res.status(200).json(allpostings)
        } else {
            if (req.query.date == 1){
                const filtered = await Posting.find({category: {$regex: req.query.category}, location: {$regex: req.query.location}, createdAt: {$gt: new Date().setHours(00,00,00)}})
                return res.status(200).json(filtered)
            } else if (req.query.date == 7) {
                const filtered = await Posting.find({category: {$regex: req.query.category}, location: {$regex: req.query.location}, createdAt: {$gt: new Date(Date.now() - 604800000).setHours(00,00,00)}})
                return res.status(200).json(filtered)
            } else if (req.query.date == 30) {
                const filtered = await Posting.find({category: {$regex: req.query.category}, location: {$regex: req.query.location}, createdAt: {$gt: new Date(Date.now() - 2419200000).setHours(00,00,00)}})
                return res.status(200).json(filtered)
            } else {
                const filtered = await Posting.find({category: {$regex: req.query.category}, location: {$regex: req.query.location}})
                return res.status(200).json(filtered)
            }
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Internal Server Error: Unknown error occurred'
        })
    }
})
app.use(cors())
app.listen(5000, function() {
    console.log('server started at port 5000')
})

module.exports = app