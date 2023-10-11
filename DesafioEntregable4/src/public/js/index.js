const socketClient = io();              //establece conexion de socket del lado del cliente 
const form = document.getElementById ('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputCode = document.getElementById('code');
const inputStock = document.getElementById('stock');
const table = document.getElementById('table')
const bodyTable = document.getElementById('tableBody')

form.onsubmit = (e) => {
    e.preventDefault();
    const product = {
      title: inputTitle.value,
      description: inputDescription.value,
      price: inputPrice.value,
      code: inputCode.value,
      stock: inputStock.value
    };
    console.log(product.description);
    socketClient.emit("createProduct", product);   //con "emit" permite enviar informacion al servidor    
  };

socketClient.on("productCreated", (product) => {            //escucha y agrega un producto 
    const { id, title, description, price, stock, code } = product;
    const row = `
      <tr>
      <td>${id}</td>
              <td>${title}</td>
              <td>${description}</td>
              <td>${price}</td>
              <td>${stock}</td>
              <td>${code}</td>
          </tr>`;
    table.innerHTML += row;
});

socketClient.on("error", (errorMessage) => {                        // Manejar el evento "error" y mostrar un mensaje de error en algún lugar de tu página web
  
  const errorDiv = document.getElementById("error-message");
  errorDiv.innerText = `${errorMessage}`;
});
