const verifyLogin = async () => {
    const token = localStorage.getItem('jwtToken')

    if(!token){
        window.location.href = './login.html'
    }
}

verifyLogin()