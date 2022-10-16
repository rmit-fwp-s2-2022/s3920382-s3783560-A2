import React, { useState, useEffect } from "react";
import { getReplies } from "../data/repository";

export default function Post(props) {
    const [replies, setReplies] = useState({})

    useEffect(() => {
        async function loadReplies() {
          const currentReplies = await getReplies(props.post.post_id);
          if (currentReplies) {
            setReplies(currentReplies.slice().reverse());
          }
        }
        loadReplies();
      }, []);

    const replyClick = event => {
        props.setReply(props.post.post_id)
    }


    return (
        <div className="bg-color-secondary">
            <div className="border my-3 p-3 bg-color">
                <h6 className="text-primary">{props.post.username}</h6>
                <div dangerouslySetInnerHTML={{ __html: props.post.text }} />
                <button onClick={replyClick} className="btn btn-primary">Reply</button>
            </div>
            {replies.length > 0 && 
            replies.map((x) =>
            <Post post={x} setReply={props.setReply}/>
          )}
        </div>
    )
}