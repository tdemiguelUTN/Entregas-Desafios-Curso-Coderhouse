//import logger from "../../utils/winston.js"


const email = document.getElementById("email").value
const message = document.getElementById("message")

async function handleResetPassword() {
    
    try {
        const response = await fetch(`/api/users/forgotPassword`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ email })
        })
        const data = await response.json();
        message.innerText = data.message;

    } catch (error) {
        //logger.error("Error",error);    

        message.innerText = "An error has ocurred while sending the email"

    }
}