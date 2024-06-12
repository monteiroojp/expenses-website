//Vars
const url = 'http://localhost:5000/api/v1/expenses'

//Function
export const getExpenses = async (queryParams, config) => {
    try {
        const response = await fetch(`${url}/${queryParams}`, config)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}