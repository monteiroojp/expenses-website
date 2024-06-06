//Sign script
import {singUpContainer, signForm, signEmailInput, signUsernameInput, signPasswordInput, signButton, signVisiblePassword, passwordInputContainer, signErrorTextContainer} from './variables.js'

//Variables
const url = 'https://personal-expenses-api-nuw7.onrender.com/api/v1/auth/register'
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

//Funções
const passwordVisibility = () => {
    if(signPasswordInput.type == 'password'){
        signPasswordInput.type = 'text'
        signVisiblePassword.innerHTML = '<i class="fa-solid fa-eye"></i>'
    }
    else if(signPasswordInput.type == 'text'){
        signPasswordInput.type = 'password'
        signVisiblePassword.innerHTML = '<i class="fa-regular fa-eye-slash"></i>'
    }
}

const signReportValidity = () =>{
    return signForm.reportValidity()
} 

const checkEmail = () => {
    console.log('cheking email')
    return emailRegex.test(signEmailInput.value)
}

const clearFilds = () => {
    const inputs = [signEmailInput, signUsernameInput, signPasswordInput]
    inputs.forEach((input) => {
        input.value = ""
    })
}



const clearError = (error) => {
    setTimeout(() => {
        error.remove()
    }, 3000)
    clearFilds()
}

async function saveAccount() {
    if (signReportValidity() && checkEmail) {
        const account = {
            email: signEmailInput.value,
            username: signUsernameInput.value,
            password: signPasswordInput.value
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(account)
        })

        if(response.ok){
            console.log('redirecting')
            const data = await response.json()
            localStorage.setItem('jwtToken', data.token)
            window.location.href = './index.html'
            clearFilds()
        }
        else{
            const errorText = document.createElement('p')
            errorText.setAttribute('id', 'signErrorText')
            errorText.textContent = 'Conta já cadastrada ou email inválido!'
            signErrorTextContainer.appendChild(errorText)
            clearError(errorText)
            clearFilds()
        }
    }
}

//Eventos
signVisiblePassword.addEventListener('click', passwordVisibility)
signButton.addEventListener('click', saveAccount)