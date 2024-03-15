const addToCartButtons = document.querySelectorAll('.addButton');
const cart = document.getElementById("cart")


const handleAddToCartButton = async (e) => {
    const productId = e.target.dataset.id
    const cartId = cart.dataset.cart
    
    try {
        const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

//accion para boton de logout
async function handleLogout (l) {
    try {
        const response = await fetch ('/api/sessions/logout', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        if (response.redirected){
                window.location.href = response.url
        }
    } catch (error) {
        console.log(error)  
    }
}

// Asigna el evento clic a cada botón de productos
addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCartButton);
});
