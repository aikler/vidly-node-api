const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const genreSchemaJoi = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

//const validateGenre = (genre) => genreSchemaJoi.validate(genre);

const getNextId = () =>
  genres.length > 0 ? Math.max(...genres.map((g) => g.id)) + 1 : 1;

function validateGenre(genre) {
  let schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(genre); // same as result.error
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
