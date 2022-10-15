module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:username", controller.one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);
  
  //delete a user
  router.delete('/delete/:username', controller.delete)

  // Create a new user.
  router.post("/", controller.create);

  //update user
  router.put("/",controller.update)

  // Add routes to server.
  app.use("/api/users", router);
};
