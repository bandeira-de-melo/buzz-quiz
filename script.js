const containerQuizzesOutros = document.querySelector(".todos-os-quizzes-container")
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

getQuizzes()

// Tela 'Comece pelo começo';

const listaDeQuizz = [];

function recebendoConfigDoQuizz() {
    const tituloInput = document.getElementById("titulo");
    const urlInput = document.getElementById("url");
    const perguntasInput = document.getElementById("perguntas");
    const niveisInput = document.getElementById("niveis");

    const titulo = tituloInput.value;
    const url = urlInput.value;
    const perguntas = perguntasInput.value;
    const niveis = niveisInput.value;
//objeto - Quizz Criado:
    const objQuizzCriado = {tituloDoQuizz: titulo, 
                            urlDoQuizz: url, 
                            qntdPerguntas: perguntas, 
                            qntdNiveis: niveis};
    listaDeQuizz.push(objQuizzCriado);

    if(titulo.length < 20){
        alert("O Título do Quizz precisa ter pelo menos 20 caracteres :)");
      }
    if(url === undefined){
        alert("Você precisa inserir um Link de imagem válido :( ");
      }
    if(perguntas < 1){
        alert("É preciso inserir pelo menos 1 pergunta ;)");
      }
    if(perguntas > 20){
        alert("O limite de perguntas é 20 :/");
      }
    if(niveis > 3){
        alert("A quantidade de níveis deve ser entre 1 e 3 :)");
      }
      console.log(url.value);
}

