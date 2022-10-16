module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Select all posts that are NOT replies
  router.get("/parents", controller.parents)

  // Select all posts that are replies to post with ID
  router.get("/replies/:ID", controller.replies)

  // Create a new post.
  router.post("/", controller.create);

  // Add routes to server.
  app.use("/api/posts", router);
};
