const socketClient = io(); //establece conexion de socket del lado del cliente 

const form = document.getElementById("chatForm");
const inputMessage = document.getElementById("chatMessage");
const h3Name = document.getElementById("name");
const divChat = document.getElementById("chat");

let user;

//alerta
Swal.fire({
  title: "Welcome",
  text: "What is your email",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "email is required";
    }
  },
  confirmButtonText: "Enter",
}).then((input) => {
  user = input.value;
  h3Name.innerText = `Chat user: ${user}`;
  socketClient.emit("newUser", user);
});

//eventos
socketClient.on("newUserBroadcast", (user) => {
  Toastify({
    text: `${user} connected`,
    duration: 5000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});

socketClient.on("chat", (messages) => {
  const chat = messages
    .map((objMessage) => `<p>${objMessage.user}: ${objMessage.message}</p>`)
    .join(" ");
  divChat.innerHTML = chat;
});

form.onsubmit = (e) => {
  e.preventDefault();
  const infoMessage = {
    user: user,
    message: inputMessage.value,
  };
  socketClient.emit("message", infoMessage);
};