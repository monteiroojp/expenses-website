//Vars
const addModal = document.getElementById('addModal')
const addExpenseForm = document.getElementById('addExpenseForm')
const modalOverlay = document.getElementById('modalOverlay')
const expenseTitle = document.getElementById('expenseTitle')
const expenseDescription = document.getElementById('expenseDescription')
const expenseDate = document.getElementById('expenseDate')
const expenseAmount = document.getElementById('expenseAmount')
const expenseCategory = document.getElementById('expenseCategory')
const apiURL = 'http://localhost:5000/api/v1/expenses'

//Functions
const openModal = () => {
    addModal.style.display = 'block'
    modalOverlay.style.display = 'block'
}

const closeModal = () => {
    addModal.style.display = 'none'
    modalOverlay.style.display = 'none'
}

const clearFields = () => {
    const fields = [expenseTitle, expenseDescription, expenseAmount, expenseDate]
    fields.forEach(field => field.value = '')
}

const createExpense = async (event) => {
    event.preventDefault();

    if (addExpenseForm.reportValidity()) {
        const expense = {
            title: expenseTitle.value,
            amount: expenseAmount.value,
            description: expenseDescription.value,
            date: expenseDate.value,
            category: expenseCategory.value
        }

        try {
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify(expense)
            })


            const data = await response.json()
            console.log(data)
            clearFields()
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }
}

//Events
document.getElementById("addExpenseButton").addEventListener('click', openModal)
document.getElementById("closeAddModalButton").addEventListener('click', closeModal)
addExpenseForm.addEventListener('submit', createExpense)