//Vars
const addModal = document.getElementById('addModal')
const modalOverlay = document.getElementById('modalOverlay');

//Functions
const openModal = () => {
    addModal.style.display = 'block'
    modalOverlay.style.display = 'block'
}

const closeModal = () => {
    addModal.style.display = 'none'
    modalOverlay.style.display = 'none'
}

//Events
document.getElementById("addExpenseButton").addEventListener('click', openModal)
document.getElementById("closeAddModalButton").addEventListener('click', closeModal)