import { loggerService } from "../services/logger.service.js";

class LoggerController {
    testAllLogs = async (req, res) => {
        try {
            const result = await loggerService.testAll();
            res.status(200).json({ loggs: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export const loggerController = new LoggerController();



