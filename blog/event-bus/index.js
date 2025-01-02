const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', async (req,res) => {
    console.log("Event Received: ", req.body.type);
    
    const event = req.body;

    events.push(event);

    try {
        await axios.post("http://posts-clusterip-srv:4000/events", event).catch(error => console.log(error));
        await axios.post("http://comments-srv:4001/events", event).catch(error => console.log(error));
        await axios.post("http://query-srv:4002/events", event).catch(error => console.log(error));
        await axios.post("http://moderation-srv:4003/events", event).catch(error => console.log(error));
    } catch (error) {
        console.log("error: " + error);        
    }

    res.send({status: 'ok'});
});

app.get("/events", (req, res) => {
    res.send(events);
})

app.listen(4005, () => { 
    console.log("listening on 4005");
}
);