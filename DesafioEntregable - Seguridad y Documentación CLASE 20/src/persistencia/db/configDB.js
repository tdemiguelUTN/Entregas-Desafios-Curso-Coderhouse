import mongoose from "mongoose";
import config from "../../config.js";
import logger from "../../utils/winston.js";

const URI = config.mongo_uri;

//conexion a la base de datos
mongoose.connect(URI)
    .then(() => logger.info("DB is connected"))
    .catch((err) => console.log(err)); 