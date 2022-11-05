const containerQuizzesOutros = document.querySelector(".criarQuiz");
const criarQuizzPerguntas = document.querySelector(".criarQuizz-perguntas");
const criarQuizzNiveis = document.querySelector(".criarQuiz-niveis");
const criarQuizzSucesso = document.querySelector(".criarQuiz-sucesso");

let listaQuizzesOutros ="";


function getQuizzes(){
    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then(response => {listaQuizzesOutros = response.data})
    .then(quizzesOutros => {
        listaQuizzesOutros.forEach((quizzesOutros) =>{
            containerQuizzesOutros.innerHTML += 
            `
            <div class="quizzOutros">
                <img src="${quizzesOutros.image}" alt="" class="quizzOutros__imagem">
                <h3 class="quizzOutros__titulo">${quizzesOutros.title}</h3>
            </div>
            `
        })
    })
}

getQuizzes();

// ------ Criação Quizz ------

// Tela 1 - Informações básicas

// Tela 2 - Perguntas

function criarPerguntas(){
    
    //document.querySelector(".comecePeloComeco").classList.add("escondido");
    //criarQuizzPerguntas.classList.remove("escondido");

    const numPerguntas = 3; // Número de perguntas selecionadas
    let perguntaInfo =`<h3>Crie suas perguntas</h3>`;

    for (let i = 0; i < numPerguntas; i++) {
        perguntaInfo += `
            <div class="criar-pergunta">
                <button class="button-editar" type="button" onclick="colapsar(this)">
                    <h4>Pergunta ${i + 1}</h4>
                    <ion-icon class="icon-editar" name="create-outline"></ion-icon>
                </button>    
   
                <div class="criar-pergunta-container escondido">
                    <input type="text" placeholder="Texto da pergunta">
                    <input type="text" placeholder="Cor de fundo da pergunta">

                    <h4>Resposta correta</h4>
                    <input type="text" placeholder="Resposta correta">
                    <input type="url" placeholder="URL da imagem">

                    <h4>Respostas incorretas</h4>
                    <input type="text" placeholder="Resposta incorreta 1">
                    <input type="url" placeholder="URL da imagem 1">
                    <input type="text" placeholder="Resposta incorreta 2">
                    <input type="url" placeholder="URL da imagem 2">
                    <input type="text" placeholder="Resposta incorreta 3">
                    <input type="url" placeholder="URL da imagem 3">
                </div>
            </div>`
    }

    criarQuizzPerguntas.innerHTML += perguntaInfo;
    criarQuizzPerguntas.innerHTML += `<button class="button-proxima-tela" onclick="criarNiveis()">Prosseguir para criar níveis</button>`;

    const colapsarPerguntas = document.querySelectorAll(".criar-pergunta-container");
    colapsarPerguntas[0].classList.remove("escondido");
}

function colapsar(element){ // Para minimizar seção na tela de criação das perguntas
    const buttonEditar = document.querySelectorAll(".button-editar");

    for (let i = 0; i < numPerguntas; i++) {
        buttonEditar[i].nextElementSibling.classList.add("escondido");
    }
    element.nextElementSibling.classList.remove("escondido")
}
criarPerguntas()
/*
function guardarPerguntas() {
    let perguntas = [];
    let pergunta = {};
    document.querySelectorAll(".criar-pergunta");

    for (let i = 0; i < numPerguntas; i++) {
        document
    }
}

// Tela 3 - Níveis

function criarNiveis() {
    document.querySelector(".criarQuizz-perguntas").classList.add("escondido");
}

// Tela 4 - Sucesso
*/