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
    if (!rb.title || !rb.desc || !rb.category || !rb.location || !rb.price || !rb.type || !rb.contact) {
        return res.status(400).json({
            message: 'Bad request: Invalid data'
        })
    } else {
        const placeholderimage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAOVBMVEXg4OB1dXXX19fd3d2EhIR9fX14eHjJycm2trbb29uurq6goKCZmZmIiIiBgYHNzc2np6e8vLySkpKXK8HrAAABuUlEQVR4nO3Z0bKCIBCAYQNFVCzr/R/2nHU6k8KpJi6wZf7vLu1id9gFhKYBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAb249h7pzr5jD29uhospnlfNo4L+boiLKYyZ0iblKYiu/iNER3PTquD9npPgbB98Za0/twH59JVasMtzXo1m+iHny7PrwpysSuebgxCtmOTlkma121l/TFZR2UqXxEebxEO/87QZlZ3inpeCPzVftkojUyJp2OWVgKy23qSsbg8evitBSXkUjHzYN9Is0oeWoYkkUKazsxRYlYKa6ldFSfs7K/8tsnUSLrXHAuG1SOXpp5t1LEiQxSe33ZqDJIC4TdkziRJkRN9J1CXFlpIj7J9RvNSd0kiUj1zSVjyiKr4X5yTRIx0kYlY8oinbzfFSaJWFlJSsaUpZpEqimttNkTOpo9nX4TOqbfdEFM6FgQpW7c8OofSrYo1Wwaq9nG1/NhVc2nbj2HD821kuOgeg7o3hyZBj1Hpo9D7M3K+HeIrSmPeq4Vfl3ruOhpnly9vdyEfa1KLkPF7nr66GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPjcD13rCcC3ILx/AAAAAElFTkSuQmCC"
        if(!rb.image1){rb.image1=placeholderimage}
        if(!rb.image2){rb.image2=placeholderimage}
        if(!rb.image3){rb.image3=placeholderimage}
        if(!rb.image4){rb.image4=placeholderimage}
        try {
            const posting = new Posting({
                id: uuid.v4().toString(), 
                username: req.auth.id,
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
        if (req.auth.id === posting.userId) {
            
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
        if (req.auth.id === posting.userId) {
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

})
app.use(cors())
app.listen(5000, function() {
    console.log('server started at port 5000')
})

module.exports = app