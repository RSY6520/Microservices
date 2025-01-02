const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;
    posts[id] = {
        id, title
    };

    try {
        await axios.post('http://event-bus-srv:4005/events', {type: "PostCreated", data: {id, title}});
    } catch (error) {
        console.log(error);
    }

    res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
    const {type, data} = req.body;
    console.log("Event Received: ", type);
    
    res.send({status: "OK"});
});

app.listen(4000, () => {
    console.log("latest:67");
    
    console.log('Listening on 4000');
    
});