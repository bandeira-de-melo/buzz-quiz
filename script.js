//window.onload = getQuizzes()

const containerQuizzesOutros = document.querySelector(".criarQuiz");
const criarQuizzPerguntas = document.querySelector(".criarQuizz-perguntas");
const criarQuizzNiveis = document.querySelector(".criarQuizz-niveis");
const criarQuizzSucesso = document.querySelector(".criarQuizz-sucesso");

let listaQuizzesOutros ="";


function getQuizzes(){
    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then(response => {listaQuizzesOutros = response.data})
    .then(() => {
        listaQuizzesOutros.forEach(quizzesOutros =>{
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
const tituloInput = document.getElementById("titulo");
const urlInput = document.getElementById("url");
const perguntasInput = document.getElementById("perguntas");
const niveisInput = document.getElementById("niveis");

function recebendoConfigDoQuizz() {
    // const tituloInput = document.getElementById("titulo");
    // const urlInput = document.getElementById("url");
    // const perguntasInput = document.getElementById("perguntas");
    // const niveisInput = document.getElementById("niveis");

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
        alert("É preciso inserir pelo menos 3 pergunta ;)");
      }
    if(perguntas > 20){
        alert("O limite de perguntas é 20 :/");
      }
    if(niveis > 3){
        alert("A quantidade de níveis deve ser entre 2 e 3 :)");
      }
      console.log(url.value);

    criarPerguntas()
}

// Tela 2 - Perguntas

function criarPerguntas(){
    
    if (!document.querySelector(".comecePeloComeco").classList.contains("escondido"))
        document.querySelector(".comecePeloComeco").classList.add("escondido");
    
    if (criarQuizzPerguntas.classList.contains("escondido"))
        criarQuizzPerguntas.classList.remove("escondido");

    const numPerguntas = 3 //document.querySelector("#perguntas").value;
    let perguntasHTML =`<h3>Crie suas perguntas</h3>`;

    for (let i = 0; i < numPerguntas; i++) {
        perguntasHTML += `
            <div id="criarPergunta${i + 1}" class="criar-pergunta">
                <button class="button-editar" type="button" onclick="colapsar(this)">
                    <h4>Pergunta ${i + 1}</h4>
                    <ion-icon id="iconEditar${i + 1}" class="icon-editar" name="create-outline"></ion-icon>
                </button>    
   
                <div id="criarPerguntaContainer${i + 1}" class="criar-pergunta-container escondido">
                    <input id="input${i + 1}TxtPergunta" type="text" placeholder="Texto da pergunta" minlength="20">
                    <input id="input${i + 1}CorPergunta" type="text" placeholder="Cor de fundo da pergunta" pattern="#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?">

                    <h4>Resposta correta</h4>
                    <input id="input${i + 1}TxtRespCorreta" type="text" placeholder="Resposta correta">
                    <input id="input${i + 1}URLRespCorreta" type="url" placeholder="URL da imagem">

                    <h4>Respostas incorretas</h4>
                    <input id="input${i + 1}TxtRespIncorreta1" type="text" placeholder="Resposta incorreta 1">
                    <input id="input${i + 1}URLRespIncorreta1" type="url" placeholder="URL da imagem 1" class="inputs-URL-incorreta">
                    <input id="input${i + 1}TxtRespIncorreta2" type="text" placeholder="Resposta incorreta 2">
                    <input id="input${i + 1}URLRespIncorreta2" type="url" placeholder="URL da imagem 2" class="inputs-URL-incorreta">
                    <input id="input${i + 1}TxtRespIncorreta3" type="text" placeholder="Resposta incorreta 3">
                    <input id="input${i + 1}URLRespIncorreta3" type="url" placeholder="URL da imagem 3" class="inputs-URL-incorreta">
                </div>
            </div>`;
    }

    criarQuizzPerguntas.innerHTML += perguntasHTML;
    criarQuizzPerguntas.innerHTML += `<button class="button-proxima-tela" onclick="guardarPerguntas()">Prosseguir para criar níveis</button>`;

    criarQuizzPerguntas.querySelector("#criarPerguntaContainer1").classList.remove("escondido");
    criarQuizzPerguntas.querySelector("#iconEditar1").classList.add("escondido");
}

const iconsEditar = document.querySelectorAll(".icon-editar");
const inputsContainer = document.querySelectorAll(".criar-pergunta-container");

function colapsar(element){ // Para recolher seção na tela de criação das perguntas

    for (let i = 0; i < perguntasInput.value; i++) {
        if (!inputsContainer[i].classList.contains("escondido")) {
            inputsContainer[i].classList.add("escondido");
            iconsEditar[i].classList.remove("escondido");
        }
    }
    element.nextElementSibling.classList.remove("escondido");
    element.querySelector(".icon-editar").classList.add("escondido");
}

let arrayPerguntas = [];

let re = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i; //Regex: para verificação da URL

function guardarPerguntas() {

    let inputTxtPergunta = [];
    let inputCorPergunta = [];

    let inputTxtRespCorreta = [];
    let inputURLRespCorreta = [];

    let inputTxtRespIncorreta1 = [];
    let inputURLRespIncorreta1 = [];
    let inputTxtRespIncorreta2 = [];
    let inputURLRespIncorreta2 = [];
    let inputTxtRespIncorreta3 = [];
    let inputURLRespIncorreta3 = [];

    for (let i = 0; i < inputsContainer.length; i++) {
        inputTxtPergunta[i] = document.querySelector(`#input${i + 1}TxtPergunta`).value;
        inputCorPergunta[i] = document.querySelector(`#input${i + 1}CorPergunta`).value;

        inputTxtRespCorreta[i] = document.querySelector(`#input${i + 1}TxtRespCorreta`).value;
        inputURLRespCorreta[i] = document.querySelector(`#input${i + 1}URLRespCorreta`).value;

        inputTxtRespIncorreta1[i] = document.querySelector(`#input${i + 1}TxtRespIncorreta1`).value;
        inputURLRespIncorreta1[i] = document.querySelector(`#input${i + 1}URLRespIncorreta1`).value;
        inputTxtRespIncorreta2[i] = document.querySelector(`#input${i + 1}TxtRespIncorreta2`).value;
        inputURLRespIncorreta2[i] = document.querySelector(`#input${i + 1}URLRespIncorreta2`).value;
        inputTxtRespIncorreta3[i] = document.querySelector(`#input${i + 1}TxtRespIncorreta3`).value;
        inputURLRespIncorreta3[i] = document.querySelector(`#input${i + 1}URLRespIncorreta3`).value;

        if (inputCorPergunta[i] === "")
            inputCorPergunta[i] = "#EC362D";

        
        if (inputTxtPergunta[i].length < 20) {
            alert(`O texto da Pergunta ${i + 1} deve ter no mínimo 20 caracteres.`);
            return
        } else if (inputTxtRespCorreta[i] === "") {
            alert(`A resposta correta da Pergunta ${i + 1} não pode estar em branco.`);
            return
        } else if (!re.test(inputURLRespCorreta[i])) {
            alert(`Insira uma URL válida na resposta correta da Pergunta ${i + 1}.`);
            return
        } else if (inputTxtRespIncorreta1[i] === "") {
            alert(`A primeira resposta incorreta da Pergunta ${i + 1} não pode estar em branco.`);
            return
        } else if (!re.test(inputURLRespIncorreta1[i])) {
            alert(`Insira uma URL válida na primeira resposta incorreta da Pergunta ${i + 1}.`);
            return
        } else if (inputTxtRespIncorreta2[i] !== "" && !re.test(inputURLRespIncorreta2[i])) {
            alert(`Insira uma URL válida na segunda resposta incorreta da Pergunta ${i + 1}.`);
            return
        } else if (inputTxtRespIncorreta3[i] !== "" && !re.test(inputURLRespIncorreta3[i])) {
            alert(`Insira uma URL válida na terceira resposta incorreta da Pergunta ${i + 1}.`);
            return
        } else if (inputTxtRespIncorreta2[i] === "" && re.test(inputURLRespIncorreta2[i])) {
            alert(`Insira um nome para a segunda resposta incorreta da Pergunta ${i + 1}.`);
            return
        } else if (inputTxtRespIncorreta3[i] === "" && re.test(inputURLRespIncorreta3[i])) {
            alert(`Insira um nome para a terceira resposta incorreta da Pergunta ${i + 1}.`);
            return
        } else if (!re.test(inputURLRespIncorreta2[i]) && inputURLRespIncorreta2[i] !== "") {
            alert(`Insira uma URL válida na segunda resposta incorreta da Pergunta ${i + 1}.`);
            return
        } else if (!re.test(inputURLRespIncorreta3[i]) && inputURLRespIncorreta3[i] !== "") {
            alert(`Insira uma URL válida na terceira resposta incorreta da Pergunta ${i + 1}.`);
            return
        } else if (
            inputTxtRespCorreta[i] === inputTxtRespIncorreta1[i] ||
            inputTxtRespCorreta[i] === inputTxtRespIncorreta2[i] ||
            inputTxtRespCorreta[i] === inputTxtRespIncorreta3[i] ||
            inputTxtRespIncorreta1[i] === inputTxtRespIncorreta2[i] ||
            inputTxtRespIncorreta1[i] === inputTxtRespIncorreta3[i]
        ) {
            alert(`As respostas de cada pergunta devem ser diferentes entre si.\nVerifique a Pergunta ${i + 1}.`);
            return
        } else if (inputURLRespIncorreta2[i] !== "" &&
            inputTxtRespIncorreta2[i] === inputTxtRespIncorreta3[i]) {
            alert(`As respostas de cada pergunta devem ser diferentes entre si.\nVerifique a Pergunta ${i + 1}.`);
            return
        }

        arrayPerguntas[i] = {
            title: inputTxtPergunta[i],
			color: inputCorPergunta[i],
			answers: [
				{
					text: inputTxtRespCorreta[i],
					image: inputURLRespCorreta[i],
					isCorrectAnswer: true
				},
				{
					text: inputTxtRespIncorreta1[i],
					image: inputURLRespIncorreta1[i],
					isCorrectAnswer: false
				},
				{
					text: inputTxtRespIncorreta2[i],
					image: inputURLRespIncorreta2[i],
					isCorrectAnswer: false
				},
				{
					text: inputTxtRespIncorreta3[i],
					image: inputURLRespIncorreta3[i],
					isCorrectAnswer: false
				}
			]
        }
    }

    criarQuizzPerguntas.classList.add("escondido");

    //criarNíveis()
}

/*
// Tela 3 - Níveis

function criarNiveis() {
    document.querySelector(".criarQuizz-perguntas").classList.add("escondido");
}
*/
//
//
//
//
//
//
//


// Tela 4 - Sucesso

function criarQuizzResultado() {
    if (criarQuizzSucesso.classList.contains("escondido"))
        criarQuizzSucesso.classList.remove("escondido");
    
    // Provisório
    document.querySelector("#titulo").value = "O quão Potterhead é você?";
    document.querySelector("#url").value = "https://img1.looper.com/img/gallery/harry-potter-character-endings-ranked-from-worst-to-best/l-intro-1605742258.jpg";

     const sucessoHTML = `
        <h3>Seu quizz está pronto!</h3>
        <div>
            <img src"${document.querySelector("#url").value}">
            <p>${document.querySelector("#titulo").value}</p>
        </div>
        <button class="button-acessar-quiz" onclick="abrirQuizz()">Acessar Quizz</button>
        <button class="button-acessar-home" onclick="window.location.reload()">Voltar para home</button>`
    
        criarQuizzSucesso.innerHTML = sucessoHTML;
}
