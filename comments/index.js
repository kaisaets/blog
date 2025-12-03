const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    const comments = commentsByPostId[req.params.id] || [];

    const newComment = {id: commentId, content, status: 'pending'}
    comments.push(newComment)
    commentsByPostId[req.params.id] = comments

    try {
        await axios.post('http://event-bus-srv:5005/events', {
            type: 'CommentCreated',            
            data: { id: commentId, content, postId: req.params.id, status: 'pending' }
        });

    } catch (err) {
        console.error('Error sending event:', err.message);
    }
    res.status(201).send(newComment)
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => comment.id === id)
        comment.status = status

        await axios.post('http://localhost:5005/events', {
            type: 'CommentUpdated',
            data: { id, postId, content, status }
        });
    }
    console.log("Received event: ", req.body)
    res.send({})
})

app.listen(5001, () => {
    console.log('Comment service running on 5001')
})