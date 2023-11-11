import mongoose from "mongoose"
//conexion a la base de datos
const URI = "mongodb+srv://thiagodemiguel:THIAGOALEXANDER2001@coderhousecluster.u2dphds.mongodb.net/CoderHouseCluster?retryWrites=true&w=majority "

mongoose.connect(URI)
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err)); 