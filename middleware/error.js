const winston = require("winston");
module.exports = function (err, req, res, next) {
  //log error
  //winston.log('error', err.message);
  winston.error(err.message, err);
  res.status(500).send("Something wrong");
};
