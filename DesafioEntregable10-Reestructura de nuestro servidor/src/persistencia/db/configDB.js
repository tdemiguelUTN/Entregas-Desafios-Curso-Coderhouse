import mongoose from "mongoose";
import config from "../../src/config.js";

const URI = config.mongo_uri;

//conexion a la base de datos
mongoose.connect(URI)
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err)); 