const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
/* module.exports = function () {
  mongoose
    .connect("mongodb://127.0.0.1:27017/vidly")
    .then(() => winston.info("Conected to MongoDB"));
}; */
const db = config.get("db");
module.exports = function () {
  mongoose
    .connect(db, {
      serverSelectionTimeoutMS: 5000, // Ждем 5 секунд вместо 30
    })
    .then(() => winston.info(`Connected to ${db}...`));
};
