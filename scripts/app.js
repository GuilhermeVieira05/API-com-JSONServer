const apiUrl = 'http://localhost:3000/games'

const formGame = document.getElementById("form-game")
const divs = document.querySelectorAll(".gameCard")
const insertBtn = document.getElementById("btnInsert")

const inputName = document.getElementById("inputName")
const inputGenre = document.getElementById("inputGenre")
const inputCompany = document.getElementById("inputCompany")
const inputYear = document.getElementById("inputYear")
const inputPrice = document.getElementById("inputPrice")
const inputWebSite = document.getElementById("inputSite")
const inputDescription = document.getElementById("inputDescription")
const inputImage = document.getElementById("inputImage")
const inputId = document.getElementById("inputId")


function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}


insertBtn.addEventListener('click', ()=>{
    if (!formGame.checkValidity()) {
        displayMessage("Preencha o formulário corretamente.");
        return;
    }
    let game = {
        name: inputName.value,
        genre: inputGenre.value,
        company: inputCompany.value,
        description: inputDescription.value,
        year: inputYear.value,
        price: `R$${inputPrice.value}`,
        site: inputWebSite.value,
        image: inputImage.value
    }

    fetch(apiUrl, {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json())
    .then(data =>{
        displayMessage("Contato Inserido com sucesso!")
    })
    .catch(error => {
        console.error("Erro ao inserir contato via API JSONServer: ", error)
        displayMessage("Erro ao inserir contato!")
    })
})









/*


function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readBook(processaDados){
    fetch(urlBase)
    .then(response => response.json())
    .then(data =>{
        processaDados(data)
    })
    .catch(error =>{
        console.log("Erro ao ler livros via API JSONServer: ", error)
        displayMessage("Erro ao ler livros")
    })
}

function createBook(book, refreshFunction){
    fetch(urlBase, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        displayMessage("Contato inserido com sucesso")
        if(refreshFunction){
            refreshFunction();
        }
    })
    .catch(error => {
        console.error("Erro ao inserir livro via API JSONServer: ", error);
        displayMessage("Erro ao inserir livro")
    })
}

function updateBook(id, book, refreshFunction){
    fetch(`${urlBase}/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        displayMessage("Contato alterado com sucesso")
        if(refreshFunction){
            refreshFunction()
        }
    })
    .catch(error => {
        console.error("Erro ao atualizar contato via API JSONServer: ", error)
        displayMessage("Erro ao atualizar contato!")
    })
}

function deleteBook(id, refreshFunction){
    fetch(`${urlBase}/${id}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        displayMessage("Contato removido com sucesso!")
        if(refreshFunction){
            refreshFunction()
        }
    })
    .catch(error => {
        console.error("Erro ao remover contato via API JSONServer: ", error)
        displayMessage("Erro ao remover contato")
    })
}

*/