import logger from "../utils/winston.js"

class LoggerService{ 
    async testAll() {
        logger.fatal("Test Fatal");
        logger.error("Test Error");
        logger.warning("Test Warning");
        logger.info("Test Info");
        logger.http("Test Http");
        logger.debug("Test Debug");
        return;
    }
}

export const loggerService = new LoggerService();
