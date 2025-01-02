const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

const handleEvent = (type, data) => {
    if(type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] }
    }
    if(type === "CommentCreated") {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status });
    }

    if(type === "CommentUpdated") {
        const { id, content, postId, status } = data;
        const comment = posts[postId].comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
} 


app.post("/events", (req, res) => {
    console.log("Event Received: ", req.body.type);
    
    const { type, data } = req.body;

    handleEvent(type, data);
    
    res.send({status: "OK"})
});

app.listen(4002, async () => {
    console.log("Listening on 4002");
    try {
        const res = await axios.get("http://event-bus-srv:4005/events");
        if(res)
            for (let event of res.data) {
                console.log("Processing event: ", event.type);
                handleEvent(event.type, event.data);
            }
    } catch (error) {
        console.log(error);
        
    }    
});

