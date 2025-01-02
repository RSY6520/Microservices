import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState("");

    const onChange = (event) => {
        setContent(event.target.value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`, {content});
        setContent('');
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label>New Comment</label>
                <input 
                    type='text'
                    value={content}
                    className='form-control'
                    onChange={onChange}
                />
            </div>
            <button className='btn btn-primary' style={{marginTop: "10px"}}>Submit</button>
        </form>
    </div>
  )
}

export default CommentCreate