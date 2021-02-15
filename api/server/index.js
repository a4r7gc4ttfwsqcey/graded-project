require('dotenv').config()
const db = require('./utils/db')
const express = require('express')
const cors = require('cors')
const app = express()

app.get('/', (req, res) => {
    try{
        return res.json({
            message: 'API'
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})
app.post('/user', (req, res) => {
    
})
app.patch('/users', (req, res) => {
    
})
app.delete('/users', (req, res) => {
    
})
app.use(cors())
app.listen(5000, function() {
    console.log('server started at port 5000')
})

exports = app