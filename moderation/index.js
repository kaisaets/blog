const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    console.log(type)

    if (type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved'

        console.log(`Moderation: Comment "${data.content}" -> ${status}`)

        try {
            await axios.post('http://localhost:5005/events', {
                type: 'CommentModerated',
                data: { id: data.id, postId: data.postId, status, content: data.content }
            })
        } catch (err){
            console.error('Error sending moderation event:', err.message)
        }
    }
    res.send({})
})

app.listen(5003, () => {
    console.log('Moderation service running on port 5003')
})