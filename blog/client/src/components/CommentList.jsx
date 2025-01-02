import React from 'react';

const CommentList = ({comments}) => {
    const renderedComments = Object.values(comments).map((comment) => {
        let content = "";
        if(comment.status === "approved"){
            content = comment.content;
        }
        if(comment.status === "pending"){
            content = "This comment is awaiting moderation";
        }
        if(comment.status === "rejected"){
            content = "This comment has been rejected";
        }
        comment.content = content;
        return (
            <li>{comment.content}</li>
        )
    });
  return <ul>{renderedComments}</ul>
}

export default CommentList;