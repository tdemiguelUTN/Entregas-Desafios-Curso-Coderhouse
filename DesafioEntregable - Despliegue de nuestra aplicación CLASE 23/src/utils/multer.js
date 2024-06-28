import multer from "multer";
import { __dirname } from "../utils.js";

//configuracion de carpetas de destino
const destination = (req, file, cb) => {
	const category = req.query.category;
	const folders = {
		profile: "profile/",
		products: "products/",
		default: "documents/",
	};
	const folder = folders[category] || folders.default;
	
	cb(null, __dirname + "/public/" + folder);
};

//configuracion almacenamiento de archivos
const storage = multer.diskStorage({
	destination: destination,
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`); 
	},
});

//constante para subir archivos
export const upload = multer( { storage: storage } );