const gameCards = document.getElementById("gameCards")
const selectGenre = document.getElementById("filtro_genre")
const selectRange = document.getElementById("priceRange")
const span = document.getElementById("price")

async function cards(){

    fetch("../data/db.json")
    .then(res => res.json())
    .then(data =>{
        let str = ""

        data.games.forEach(game => {
            str += `<div class="card col-md-4 gameCard" style="width: 18rem;">
            <img src="${game.image}" class="card-img-top" alt="imagem do jogo">
            <div class="card-body">
            <h5 class="card-title">${game.name} - ${game.year}</h5>
            <p class="card-text"><strong>${game.genre}</strong></p>
            <p class="card-text">${game.description}</p>
            <p class="card-text"><strong>${game.company}</strong> </p>
            <p class="card-text">${game.price !== "R$0.00" ? game.price : "Grátis"}</p>
            <a href="${game.site}" target="_blank" class="btn btn-primary">Mais detalhes</a>
            </div>
            </div>`
        })
        gameCards.innerHTML = str
    })
    .catch(error => console.error("Erro", error))
}

function ListaGames(){
    let filtroGenre = selectGenre.value
    let filtroPrice = selectRange.value
    gameCards.innerHTML = ''

    
    fetch("../data/db.json")
    .then(res => res.json())
    .then(data => {
        let str = ""
        data.games.forEach(game =>{
            let price = game.price.split('$')[1]
            if(game.genre.toUpperCase() == filtroGenre.toUpperCase() || filtroGenre == "-1" && parseFloat(price) < filtroPrice || filtroPrice == 0){
                if(parseFloat(price) <= parseFloat(filtroPrice) || parseFloat(filtroPrice) == 0){
                str += `<div class="card col-md-4 gameCard" style="width: 18rem;">
                <img src="${game.image}" class="card-img-top" alt="imagem do jogo">
                <div class="card-body">
                <h5 class="card-title">${game.name} - ${game.year}</h5>
                <p class="card-text"><strong>${game.genre}</strong></p>
                <p class="card-text">${game.description}</p>
                <p class="card-text"><strong>${game.company}</strong> </p>
                <p class="card-text">${game.price !== "R$0.00" ? game.price : "Grátis"}</p>
                <a href="${game.site}" target="_blank" class="btn btn-primary">Mais detalhes</a>
                </div>
                </div>`
                gameCards.innerHTML = str
            }
            }
        })
    })
}


function priceRange(){
    selectRange.addEventListener('change', priceRange)
    span.textContent = `R$${selectRange.value}`
}






/*
const select = document.getElementById("filtro_genre")
const selectAuthor = document.getElementById("filtro_author")

function showBooks() {
    tableBooks = document.getElementById("table-book");

    // Remove todas as linhas do corpo da tabela
    tableBooks.innerHTML = "";

    readBook (dados => {
        // Popula a tabela com os registros do banco de dados
        for (i = 0; i < dados.length; i++) {
            let book = dados[i];    
            tableBooks.innerHTML += `<tr><td scope="row">${contato.id}</td>
                                            <td>${book.name}</td>
                                            <td>${book.genre}</td>
                                            <td>${book.author}</td>
                                            <td>${book.year}</td>
                                            <td>R$${book.price}</td>
                                        </tr>`;
        }
    })
}

function init() {
    // Define uma variável para o formulário de contato
    formBook = document.getElementById("form-book");

    // Adiciona funções para tratar os eventos 
    btnInsert = document.getElementById("btnInsert");
    btnInsert.addEventListener ('click', function () {
        // Verifica se o formulário está preenchido corretamente
        if (!formContato.checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoName = document.getElementById ('inputName').value;
        let campoGenre = document.getElementById ('inputGenre').value;
        let campoAuthor = document.getElementById ('inputAuthor').value;
        let campoYear = document.getElementById ('inputYear').value;
        let campoPrice = document.getElementById ('inputPrice').value;

        // Cria um objeto com os dados do contato
        let book = { name: campoName, 
            genre: campoGenre, 
            author: campoAuthor, 
            year: campoYear, 
            price: campoPrice};
        let cont = 0;
        fetch(urlBase)
            .then(response => response.json())
            .then(data =>{
                for(i=0; i<data.length; i++){
                    if(campoGenre.toUpperCase() == data["genre"][i].toUpperCase()){
                        cont++;
                    }
                    if(cont == 0){
                        let option = document.createElement("option")
                        option.value = campoGenre
                        option.innerHTML = campoGenre
                        select.append(option)
                    }
                }
            })

        // Cria o contato no banco de dados
        createBook(book, showBooks);

        // Limpa o formulario
        formContato.reset()
    });

    // Trata o click do botão Alterar
    btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.addEventListener ('click', function () {
        // Obtem os valores dos campos do formulário
        let campoId = document.getElementById("inputId").value;
        if (campoId == "") {
            displayMessage("Selecione antes um contato para ser alterado.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoNome = document.getElementById('inputNome').value;
        let campoTelefone = document.getElementById('inputTelefone').value;
        let campoEmail = document.getElementById('inputEmail').value;
        let campoCidade = document.getElementById('inputCidade').value;
        let campoCategoria = document.getElementById('inputCategoria').value;
        let campoSite = document.getElementById('inputSite').value;

        // Cria um objeto com os dados do contato
        let contato = { nome: campoNome, 
            telefone: campoTelefone, 
            email: campoEmail, 
            cidade: campoCidade, 
            categoria: campoCategoria,
            website: campoSite };

        // Altera o contato no banco de dados
        updateContato(parseInt(campoId), contato, exibeContatos);

        // Limpa o formulario
        formContato.reset()
    });

    // Trata o click do botão Excluir
    btnDelete = document.getElementById('btnDelete');
    btnDelete.addEventListener ('click', function () {
        let campoId = document.getElementById('inputId').value;
        if (campoId == "") {
            displayMessage("Selecione um contato a ser excluído.");
            return;
        }

        // Exclui o contato no banco de dados
        deleteContato(parseInt(campoId), exibeContatos);

        // Limpa o formulario
        formContato.reset()
    });

    // Trata o click do botão Listar Contatos
    btnClear = document.getElementById('btnClear');
    btnClear.addEventListener ('click', function () {                
        formContato.reset()
    });

    // Oculta a mensagem de aviso após alguns 5 segundos
    msg = document.getElementById('msg');
    msg.addEventListener ("DOMSubtreeModified", function (e) {
        if (e.target.innerHTML == "") return;
        setTimeout (function () {
            alert = msg.getElementsByClassName("alert");
            alert[0].remove();
        }, 5000);
    })

    // Preenche o formulário quando o usuario clicar em uma linha da tabela 
    gridContatos = document.getElementById("grid-contatos");
    gridContatos.addEventListener('click', function (e) {
        if (e.target.tagName == "TD") { 

            // Obtem as colunas da linha selecionada na tabela
            let linhaContato = e.target.parentNode;
            colunas = linhaContato.querySelectorAll("td");

            // Preenche os campos do formulário com os dados da linha selecionada na tabela
            document.getElementById ('inputId').value = colunas[0].innerText;
            document.getElementById ('inputNome').value = colunas[1].innerText;
            document.getElementById ('inputTelefone').value = colunas[2].innerText;
            document.getElementById ('inputEmail').value = colunas[3].innerText;
            document.getElementById ('inputCidade').value = colunas[4].innerText;
            document.getElementById ('inputCategoria').value = colunas[5].innerText;
            document.getElementById ('inputSite').value = colunas[6].innerText;
        }
    });

    exibeContatos();
}

*/