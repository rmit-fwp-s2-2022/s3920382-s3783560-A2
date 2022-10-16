export default function Post(props) {

    const replyClick = event => {
        props.setReply(props.post.post_id)
    }

    return (
        <div className="border my-3 p-3">
            <h6 className="text-primary">{props.post.username}</h6>
            {/* <label>
            <input 
            type="checkbox"
            onChange={() => {
                replyStatus.isReply = true
                replyStatus.replyTo = x
                console.log("checkbox marked")
                console.log(replyStatus)
            }}/>
            Reply to this post</label> */}
            <div dangerouslySetInnerHTML={{ __html: props.post.text }} />
            <button onClick={replyClick} className="btn btn-primary">Reply</button>
        </div>
    )
}