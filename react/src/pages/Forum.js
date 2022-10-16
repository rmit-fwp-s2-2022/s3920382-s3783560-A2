import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getPosts, createPost } from "../data/repository";
import Post from "./Post";

export default function Forum(props) {
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const replyStatus = {isReply: false, replyTo: null}

  const setReplyStatus = (replyID) => {
    console.log(replyID)
    console.log(replyStatus.replyTo)
    if (replyStatus.replyTo === replyID) {
      replyStatus.replyTo = null
      replyStatus.isReply = false
    } else {
      replyStatus.replyTo = replyID
      replyStatus.isReply = true
    }
    console.log("Setting replyID to be")
    console.log(replyStatus.replyTo)
  }


  // Load posts.
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();

      setPosts(currentPosts.slice().reverse());
      setIsLoading(false);
    }

    loadPosts();
  }, []);

  useEffect(() => {
    console.table(replyStatus)
  }, [replyStatus.isReply, replyStatus.replyTo])

  const resetPostContent = () => {
    setPost("");
    setErrorMessage(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // As React Quill uses HTML tags within the text the empty check first removes all HTML elements using a regex.
    if(post.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A post cannot be empty.");
      return;
    }

    // Create post.
    const newPost = { text: post, username: props.user.username};
    await createPost(newPost);

    // Add post to locally stored posts.
    setPosts([...posts, newPost]);

    resetPostContent();
  };

  return (
    <div className="">
      <form className="justify-content-center" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="custom-subheading">New Post</legend>
          <div className="form-group bg-color-secondary" style={{ paddingBottom: "60px" }}>
              <ReactQuill theme="snow" value={post} onChange={setPost} style={{ height: "180px" }} />
          </div>
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

      <h1>Forum</h1>
      <div>
        {isLoading ?
          <div>Loading posts...</div>
          :
          posts.length === 0 ?
            <span className="text-muted">No posts have been submitted.</span>
            :
            posts.map((x) =>
              <Post post={x} setReply={setReplyStatus}/>
            )
        }
      </div>
    </div>
  );
}
