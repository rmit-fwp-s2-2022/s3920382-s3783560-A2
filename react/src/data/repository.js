import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(username) {
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function deleteUser (id) {
  await axios.delete(API_HOST + `/api/users/delete/${id}`);
}

async function updateUser (user) {
  const response = await axios.put(API_HOST + "/api/users", {user})
  return response.data
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function getParentPosts() {
  const response = await axios.get(API_HOST + "/api/posts/parents")

  return response.data;
}

async function getReplies(ID) {
  const response = await axios.get(API_HOST + `/api/posts/replies/${ID}`)
  
  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}
// --- Reply ---------------------------------------------------------------------------------------
async function createReply(reply) {
  const response = await axios.post(API_HOST + "/api/reply", reply)
  return response.data
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getPosts, getParentPosts, getReplies, createPost,
  getUser, removeUser,createReply,
  deleteUser, updateUser
}
