require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./utils/db')

app.get('/', function(req, res) {
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
app.use(cors())
app.listen(5000, function() {
    console.log('server started at port 5000')
})

module.exports = app