import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState("");

    const onChange = (event) => {
        const text = event.target.value;
        setTitle(text);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(title) 
            await axios.post("http://posts.com/posts/create", { title });
        setTitle("");
        
    }

  return (
    <div> hhhhhhhh
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" onChange={onChange} className="form-control"/>
            </div>
            <button className="btn btn-primary" style={{marginTop: "10px"}}>Submit</button>
        </form>
    </div>
  )
}

export default CreatePost