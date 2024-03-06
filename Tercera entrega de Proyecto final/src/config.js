import dotenv from "dotenv";
import program from "./commander.js"

const mode = program.opts().mode;       //saco la informacion del mode que viene por argumento (commander)
dotenv.config({
  path: 
    mode === "prod"
      ? ".env.production"
      : mode === "test"
      ? ".env.testing"
      : ".env",
});

export default {
  mongo_uri: process.env.MONGO_URI,

  port: process.env.PORT,

  jwt_secret_key: process.env.JWT_SECRET_KEY,
  sessions_secret_key: process.env.SESSION_SECRET_KEY, 

  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_client_secret: process.env.GITHUB_CLIENT_SECRET,
  github_callback_url: process.env.GITHUB_CALLBACK_URL,

  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.GOOGLE_CALLBACK_URL,

  gmail_user: process.env.GMAIL_USER,
  gmail_password: process.env.GMAIL_PASSWORD,

  twilio_account_sid: process.env.TWILIO_ACCOUNT,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
  twilio_whatsapp_phone_number: process.env.TWILIO_WHATSAPP_PHONE_NUMBER,
};