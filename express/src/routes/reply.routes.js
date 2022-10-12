module.exports = (express, app) => {
    const controller = require("../controllers/reply.controller.js");
    const router = express.Router();
  
    // Create a new reply.
    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/api/posts", router);
  };