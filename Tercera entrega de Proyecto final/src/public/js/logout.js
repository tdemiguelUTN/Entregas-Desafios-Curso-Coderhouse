async function handleLogout (e) {
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

