const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.get("/", async (req, res) => {
  let users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body); // same as result.error
  if (error) return res.status(400).json(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Wrond email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Wrong email or password");

  const token = user.getAuthToken();

  res.send(token);
});

// validation with joi
function validate(user) {
  /* const complexityOptions = {
    min: 5,
    max: 255,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4, // Number of the above rules that must be met
  }; */
  const schemaJoiUser = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])"),
      )
      .required(),
  });
  return schemaJoiUser.validate(user);
}

module.exports = router;
