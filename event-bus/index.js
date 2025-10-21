const express = require ('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', (req, res) =>{
    const event = req.body;
    console.log('Received event: ', event.type)

    axios.post('http://localhost:5000/events', event).catch(err =>{
        console.log('Error forwarding post service', err.message)
    } )

     axios.post('http://localhost:5000/events', event).catch(err =>{
        console.log('Error forwarding post service', err.message)
    } )

    res.json({ status; 'OK'});
} )

app.listen(5005, () => {
    console.log('event-bus service')
    console.log('server running on http://localhost:5005')
} )