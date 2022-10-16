import React, { useState, useEffect } from "react";
import { getReplies } from "../data/repository";
import arrow from "../down-right.png";

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
        props.setReply({postID: props.post.post_id, postOwner: props.post.username})
    }


    return (
        <div className="bg-color flex-fill">
            <div className="border my-3 p-3 bg-color-secondary">
                <h6 className="text-color-primary"><strong>{props.post.username}</strong></h6>
                <hr/>
                <div dangerouslySetInnerHTML={{ __html: props.post.text }} />
                <button onClick={replyClick} className="btn btn-primary">Reply</button>
            </div>
            <div className="d-flex flex-column">                 
                    {replies.length > 0 && 
                    replies.map((x) => <>
                    <div className="d-flex">
                        <img src={arrow} style={{display:"inline", width:"75px", height:"75px", paddingRight:"10px"}}/>
                        <Post post={x} setReply={props.setReply}/>
                    </div>
                    </>
                    )}
            </div>
        </div>

    )
}