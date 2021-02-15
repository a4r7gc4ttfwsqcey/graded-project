const express = require('express')
const app = express()

app.get('/', function(req, res) {
    return res.json({
        message: 'Hello'
    })
})

app.listen(5000, function() {
    console.log('server started at port 5000')
})