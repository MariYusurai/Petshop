'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_PETSHOP')) ?? []
const setLocalStorage = (dbPETSHOP) => localStorage.setItem("db_PETSHOP", JSON.stringify(dbPETSHOP))

// CRUD - create read update delete
const deletePETSHOP = (index) => {
    const dbPETSHOP = readPETSHOP()
    dbPETSHOP.splice(index, 1)
    setLocalStorage(dbPETSHOP)
}

const updatePETSHOP = (index, PETSHOP) => {
    const dbPETSHOP = readPETSHOP()
    dbPETSHOP[index] = PETSHOP
    setLocalStorage(dbPETSHOP)
}

const readPETSHOP = () => getLocalStorage()

const createPETSHOP = (PETSHOP) => {
    const dbPETSHOP = getLocalStorage()
    dbPETSHOP.push (PETSHOP)
    setLocalStorage(dbPETSHOP)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const savePETSHOP = () => {
    debugger
    if (isValidFields()) {
        const PETSHOP = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createPETSHOP(PETSHOP)
            updateTable()
            closeModal()
        } else {
            updatePETSHOP(index, PETSHOP)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (PETSHOP, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${PETSHOP.nome}</td>
        <td>${PETSHOP.email}</td>
        <td>${PETSHOP.celular}</td>
        <td>${PETSHOP.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tablePETSHOP>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tablePETSHOP>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbPETSHOP = readClient()
    clearTable()
    dbPETSHOP.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editPETSHOP = (index) => {
    const PETSHOP = readPETSHOP()[index]
    PETSHOP.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editPlPETSHOP(index)
        } else {
            const PETSHOP = readPETSHOP()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${PETSHOP.nome}`)
            if (response) {
                deletePETSHOP(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarPETSHOP')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', savePETSHOP)

document.querySelector('#tablePETSHOP>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)