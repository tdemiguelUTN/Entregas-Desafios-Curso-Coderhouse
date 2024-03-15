async function handlePurchase (cart) {
    try {
        const response = await fetch (`/api/carts/${cart}/purchase`, {
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
