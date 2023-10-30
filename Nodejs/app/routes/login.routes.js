module.exports = app => {
  const loginController = require("../controllers/login.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", loginController.create);

  app.use('/login', router);
};
