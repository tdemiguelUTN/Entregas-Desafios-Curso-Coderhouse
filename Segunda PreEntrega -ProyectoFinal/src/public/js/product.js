const addToCartButtons = document.querySelectorAll('.addButton');
const cart = document.getElementById("cart")

const handleAddToCartButton = async (e) => {
    const productId = e.target.dataset.id
    const cartId = cart.dataset.id
    
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

// Asigna el evento clic a cada botón
addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCartButton);
});