import { Router } from "express";
import { transporter } from "../nodemailer.js";
import { __dirname } from "../utils.js";
import { client } from "../twilio.js";
import config from "../config.js";
const router = Router();


// transporter 
// router.get("/", async (req, res) => {
//   const options = {
//     from: "thiagodemi10@gmail.com",
//     to: [
//       "thiagodemi10@gmail.com",
//     ],
//     subject: "Segundo mail",
//     text: "Primer mail enviado con nodemailer",
//     html: "<h1>Primer h1 de prueba</h1>",
//     attachments: [{ path: __dirname + "/crypto.jpeg" }],
//   };
//   await transporter.sendMail(options);
//   res.send("Enviando email");
// });


// utilizo transporter de forma dinamica, cuando un usuario se registra 
// router.post("/", async (req, res) => {
//   const { first_name, last_name, email, message } = req.body;

//   const options = {
//     from: "thiagodemi10@gmail.com",
//     to: email,
//     subject: message,
//     text: `Registro exitoso. Bienvenido ${first_name} ${last_name}`,
//   };
//   await transporter.sendMail(options);
//   res.send("SIGNUP");
// });

// twilio
// router.get("/twilio", async (req, res) => {
//   const options = {
//     body: "Prueba twilio whatsapp",
//     to: "whatsapp:+5491160586931",
//     from: config.twilio_whatsapp_phone_number,
//   };
//   await client.messages.create(options);
//   res.send("TWILIO");
// });

export default router 