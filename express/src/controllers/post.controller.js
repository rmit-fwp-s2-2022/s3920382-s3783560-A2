const db = require("../database");

// Select all posts from the database. 
exports.all = async (req, res) => {
  const posts = await db.post.findAll();


  res.json(posts);
};

// Select all posts that are NOT replies
exports.parents = async (req, res) => {
  const posts = await db.post.findAll({ where: { parentID: null } })

  res.json(posts)
}

// Select all replies to post with postID of ID
exports.replies = async (req, res) => {
  const posts = await db.post.findAll({ where: { parentID: req.params.ID } })

  res.json(posts)
}

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({
    text: req.body.text,
    username: req.body.username,
    parentID: req.body.parentID,
    image: req.body.image
  });

  res.json(post);
};
