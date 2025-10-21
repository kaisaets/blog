const express = require('express')
const{ randomBytes } = require('node:crypto')
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000'}))

const posts =[] 

app.get('/posts', (req, res) => {
    res.json(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const title = req.body.title
    const post ={

    } 

    posts.push(post)

    axios.post('http://localhost:5005',{
        type: 'PostCreated',
        data: post
    } ) catch ((err){
        console.log('Received Event: ', err.message)
    });
})

app.post('/events', (req, res) => {
    console.log('Received event: ', req.body.type)
    res.json({ })
})

app.listen(5000, () => {
    console.log('Posts service running on 5000')
})