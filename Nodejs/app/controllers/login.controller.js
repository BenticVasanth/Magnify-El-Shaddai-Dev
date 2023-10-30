const loginModel = require("../models/login.model.js");

// Retrieve all loginModel from the database (with condition).
exports.findAll = (req, res) => {
  loginModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Login Model."
      });
    else res.send(data);
  });
};