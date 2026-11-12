//require("dotenv").config();
const winston = require("winston");
const error = require("./middleware/error");
const express = require("express");
const db = require("./startup/db");
const app = express();

//throw new Error("Something crashed during startup");
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

app.use(error);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening port ${port}`);
});
module.exports = server;
