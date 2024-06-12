//Vars
import {getExpenses} from '../../utils/getExpenses.js'
const newerExpenses = await getExpenses('?createdBy=true&sort=date:asc&pages=1&limit=10', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }
})

console.log(newerExpenses)
const expensesContainer = document.getElementById('expensesContainer')

//Functions
const formateDate = (date) => {
    let formatedDate = date.split('T')[0];
    formatedDate = formatedDate.split('-')
    return `${formatedDate[2]}/${formatedDate[1]}/${formatedDate[0]}`
}


const renderExpenses = (expenses) => {
    if(!expenses){
        console.log('Sem nenhuma despesas no momento')
    }
    else{
        expenses.forEach(expense => {
            const formatedDate = formateDate(expense.date)

            expensesContainer.innerHTML += `
                <div class="expense-card">
                    <div class="expense-header">
                        <i class="fa-solid fa-burger"></i>
                    </div>
                    <div class="expense-body">
                        <p class="expense-title">${expense.title}</p>
                        <p class="expense-description">${expense.description}</p>
                    </div>
                    <div class="expense-footer">
                        <p class="expense-date">${formatedDate}</p>
                        <p class="expense-amount">R$ ${expense.amount.replace('.', ',')}</p>
                    </div>
                </div>`
        })
    }
}




//Events
renderExpenses(newerExpenses)