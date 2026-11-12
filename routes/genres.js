const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
//const { Mongoose } = require("mongoose");
//const asyncMiddleware = require("../middleware/async");

// list of all genres

/* router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  }),
);
 */

router.get("/", async (req, res) => {
  //throw new Error("Could not get genres.");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id))
  //   return res.status(404).json(`Not valid ID`);

  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).json(`Genre with ${req.params.id} not found.`);
  res.json(genre);
});

// Add new genre
router.post("/", auth, async (req, res) => {
  const { error, value } = validate(req.body); // same as result.error
  if (error) return res.status(400).json(error.message);

  let genre = new Genre({ name: value.name });
  genre = await genre.save();
  res.send(genre);
});

// update
router.put("/:id", auth, async (req, res) => {
  //validate
  //const {error, value} = validate(req.body);// same as result.error
  const { error } = validate(req.body); // same as result.error
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    },
  );

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).json(`Genre with ${req.params.id} not found.`);

  res.json(genre);
});

module.exports = router;
