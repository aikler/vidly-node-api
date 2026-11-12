const winston = require("winston");
//require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  // 1. Создаем красивый и цветной формат для консоли
  const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }), // Включает цвета для всего текста
    winston.format.simple(), // Форматирует лог в понятную строку вместо сырого JSON
  );

  // 2. Обработка необработанных исключений (Uncaught Exceptions)
  winston.exceptions.handle(
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" }),
  );

  // 3. Обработка отклоненных промисов (Unhandled Rejections)
  winston.rejections.handle(
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({ filename: "rejections.log" }),
  );

  winston.exitOnError = false;

  // 4. Обычный вывод логов в консоль (например, для winston.info)
  winston.add(new winston.transports.Console({ format: consoleFormat }));

  // 5. Запись в файлы и базу
  winston.add(new winston.transports.File({ filename: "logfile.log" }));

  /* winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://127.0.0.1:27017/vidly",
      level: "error",
    }),
  ); */
};
