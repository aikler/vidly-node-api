const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
//const passwordComplexity = require("joi-password-complexity");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    min: 5,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },
  isAdmin: Boolean,
});

schema.method("getAuthToken", function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey"),
  );
});

const User = mongoose.model("User", schema);

// validation with joi
function validateUser(user) {
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
    name: Joi.string().alphanum().min(5).max(50).required(),
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

exports.User = User;
exports.validate = validateUser;
