import winston from "winston";
import config from "../config.js";

let logger;

// Configuration Levels 
const customeLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'bold redBG',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'gray',
  }
}

switch (config.environment) {
  case "production":
    logger = winston.createLogger({
      levels: customeLevels.levels,
      transports: [
        new winston.transports.Console({
          level: "info",
          format: winston.format.combine(
            winston.format.colorize({ colors: customeLevels.colors }),
            winston.format.simple()
          ),
        }),
        new winston.transports.File({
          filename: 'errors.log',
          level: "error",
          format: winston.format.combine(
            winston.format.simple(),
            winston.format.timestamp()
          )
        })
      ],
    });
    break;
  case "development":
    logger = winston.createLogger({
      levels: customeLevels.levels,
      transports: [
        new winston.transports.Console({
          level: "debug",
          format: winston.format.combine(
            winston.format.colorize({ colors: customeLevels.colors }),
            winston.format.simple()
          ),
        }),
      ],
    });
    break;
}

export default logger;