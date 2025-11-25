const express = require ('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', (req, res) =>{
    const event = req.body;
    console.log('Received event: ', event.type)

    axios.post('http://localhost:5000/events', event).catch(err =>{
        console.log('Error forwarding to posts service', err.message)
    } )

     axios.post('http://localhost:5001/events', event).catch(err =>{
        console.log('Error forwarding to comments service', err.message)
    } )
    axios.post('http://localhost:5002/events', event).catch(err => {
        console.log('Error forwarding to query service:', err.message)
    })
    axios.post('http://localhost:5003/events', event).catch(err => {
        console.log('Error forwarding to moderation service:', err.message)
    })

    res.json({ status: 'OK'});
} )

app.listen(5005, () => {
    console.log('event-bus service')
    console.log('server running on http://localhost:5005')
} )