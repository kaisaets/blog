const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id:comments', (req, res) => {
    const
})

app.post('/events', req, res () => {
    console.log("Received event: ", req.body.type)
    res.send({})
})

app.listen(5001, () => {
    console.log('Comment service running on 5001')
})