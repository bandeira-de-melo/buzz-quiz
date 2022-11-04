const containerQuizzesOutros = document.querySelector(".criarQuiz");
const criarQuizzPerguntas = document.querySelector(".criarQuiz-perguntas");
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
    
    // Tela anterior .classList.add("escondido");
    criarQuizzPerguntas.classList.remove("escondido");

    let i=0;
    const numPerguntas = 3; // Número de perguntas selecionadas
    let perguntaInfo =`<h3>Crie suas perguntas</h3>`;

    for (let i = 0; i < numPerguntas; i++) {
        perguntaInfo += `
            <div class="criar-pergunta">
                <button type="button" class="button-editar" onclick="colapsar(this)">
                    <h4>Pergunta ${[i]}</h4>
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
    criarQuizzPerguntas.innerHTML += `<button onclick="criarNiveis()">Prosseguir para criar níveis</button>`;

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

// Tela 3 - Níveis

function criarNiveis() {}

// Tela 4 - Sucesso
