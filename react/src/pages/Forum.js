import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getParentPosts, createPost } from "../data/repository";
import Post from "./Post";

export default function Forum(props) {
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postLink, setPostLink] = useState('')

  const [replyTo, setReplyTo] = useState({postID: null, postOwner: null})

  console.log(`reply to is "${replyTo.postID}"`)

  const setReplyStatus = ({postID: replyID, postOwner: owner}) => {
    if (replyTo.postID === replyID) {
      setReplyTo({postID: null, postOwner: null})
    } else {
      setReplyTo({postID: replyID, postOwner: owner })
    }
  }


  // Load posts.

  async function loadPosts() {
    const currentPosts = await getParentPosts();

    setPosts(currentPosts.slice().reverse());
    setIsLoading(false);
    setReplyTo({postID: null, postOwner: null})
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const resetPostContent = () => {
    setPost("");
    setErrorMessage(null);
  }

  const onLinkChange = (e) => {
    setPostLink(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // As React Quill uses HTML tags within the text the empty check first removes all HTML elements using a regex.
    if(post.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A post cannot be empty.");
      return;
    } else if (post.replace(/<(.|\n)*?>/g, "").trim().length > 600) {
      setErrorMessage("Posts must be under 600 characters")
      return
    }

    // Create post.
    const newPost = { text: post, username: props.user.username, parentID: replyTo.postID, image: postLink};
    await createPost(newPost);

    // Add post to locally stored posts.
    setPosts([newPost, ...posts]);
    await loadPosts();
    resetPostContent();
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-1"></div>
          <div className="col-10">
            <form className="justify-content-center" onSubmit={handleSubmit}>
              <fieldset>
                <legend className="custom-subheading">New Post</legend>
                {replyTo.postID !== null && 
                <span style={{marginBottom:"20px"}} className="custom-subheading">Replying to 
                <span className="text-color-secondary "> {replyTo.postOwner}</span>
                </span>}
                <div className="form-group bg-color-secondary" style={{ paddingBottom: "60px" }}>
                    <ReactQuill theme="snow" value={post} onChange={setPost} style={{ height: "180px" }} />
                </div>
                <input 
                  className='form-control' 
                  type='URL' 
                  id='linkInput' 
                  placeholder='Direct image link only' 
                  style={{marginBottom:10}} 
                  onChange={onLinkChange}>
                </input>
                {errorMessage !== null &&
                  <div className="form-group">
                    <span className="text-danger">{errorMessage}</span>
                  </div>
                }
                <div className="form-group">
                  <input type="button" 
                    className="btn btn-danger mr-5" 
                    value="Cancel" 
                    onClick={resetPostContent} />
                  <input type="submit" 
                    className="btn btn-primary" 
                    value="Post" 
                    />
                </div>
              </fieldset>
            </form>
          </div>
        <div className="col-1"></div>
      </div>

      <h1 className="custom-subheading">Forum</h1>
      <div>
        {isLoading ?
          <div className="custom-subheading">Loading posts...</div>
          :
          posts.length === 0 ?
            <span className="custom-subheading">No posts have been submitted.</span>
            :
            posts.map((x) =>
              <Post post={x} setReply={setReplyStatus}/>
            )
        }
      </div>
    </div>
  );
}
