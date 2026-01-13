const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
// app.use(cors({ origin: 'http://localhost:3000' }))

const allowedOrigins = [
  "https://blog.local",
  "http://blog.local",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("CORS blocked: " + origin));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

app.use(cors(corsOptions));

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (req.body.type === 'PostCreated'){
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }

    if (req.body.type === 'CommentCreated') {
        const { id, content, postId } = data
        const post = posts[postId]
        post.comments.push({ id, content})
    }

    if (type === 'CommentUpdated'){
        const { id, content, postId, status } = data
        const post = posts[postId]
        const comment = post.comments.find(comment => comment.id === id)

        comment.status = status
        comment.content = content
    }

    console.log(posts)
    res.json({ })
})

app.listen(5002, () => {
    console.log('query service')
    console.log('server running on http://localhost:5002')
})