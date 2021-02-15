require('dotenv').config()
const db = require('./utils/db')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyparser = require('body-parser')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
app.post('/user', async (req, res) => {
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
app.patch('/users', (req, res) => {
    
})
app.delete('/users', (req, res) => {
    
})
app.use(cors())
app.listen(5000, function() {
    console.log('server started at port 5000')
})

module.exports = app