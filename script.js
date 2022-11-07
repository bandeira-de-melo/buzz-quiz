//window.onload = getQuizzes()

const containerQuizzesOutros = document.querySelector(".criarQuiz");
const criarQuizzPerguntas = document.querySelector(".criarQuizz-perguntas");
const criarQuizzNiveis = document.querySelector(".agoraDecidaOsNiveis");
const criarQuizzSucesso = document.querySelector(".criarQuizz-sucesso");
const quizzesOustrosContainer = document.querySelector(".todos-os-quizzes-container")

let telaListaQuizzes = document.querySelector(".tela-lista-de-quizzes");
let listaQuizzesOutros ="";
let quizzSelecionado = ""
let quizzPerguntas = ""
let objetoQuizz = ""


function getQuizzes(){
    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then(response => {listaQuizzesOutros = response.data})
    .then(() => {
        listaQuizzesOutros.forEach(quizzOutros =>{ 
            
            quizzesOustrosContainer.innerHTML += 
            `
            <div class="quizzOutros" onclick="getQuizz(${quizzOutros.id});">
                <img src="${quizzOutros.image}" alt="" class="quizzOutros__imagem">
                <h3 class="quizzOutros__titulo">${quizzOutros.title}</h3>
            </div>
            `
            
        })
    })
    .catch(error => {
        
    })
    
}

getQuizzes()



function getQuizz(elId){
    
// ----- CRIAÇÃO DO QUIZZ -----

    axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elId}`)
    .then(function(res){
    objetoQuizz = res.data
    quizzPerguntas = res.data.questions
    toggleEscondido(objetoQuizz)

})
}

// Tela abrirQuizz
function toggleEscondido(objetoQuizz){
    console.log("oi")
    telaListaQuizzes.classList.add("escondido")
    telaExibicaoQuizz.classList.remove("escondido")
    perguntaContainer.classList.remove("escondido")
    telaExibicaoQuizz.innerHTML = `
    <div class="titulo-quizz__container">
    <p class="titulo-quizz">${objetoQuizz.title}</p>
    </div>
    `
    //inserirPerguntas(objetoQuizz)
    for(let i = 0; i < objetoQuizz.questions.length; i++){
        perguntaContainer.innerHTML +=`
        <div class="quizz-pergunta-box">
            <p class="pergunta">${objetoQuizz.questions[i].title}</p>
        </div>
        `
        for(let r = 0; r < objetoQuizz.questions[i].answers.length; r++) {
            respostasContainer.innerHTML += `
            <div class="quizz-respostas-box">
                <div class="resposta-box">
                    <img src="${quizzPerguntas[r].image}" alt="" class="imagem-resposta">
                    <p class="titulo-resposta">${quizzPerguntas[r].text}</p>
                </div>
            </div>
            `
        }
    }

}


// Tela 1 -  'Comece pelo começo';

const listaDeQuizz = [];
const tituloInput = document.getElementById("titulo");
const urlInput = document.getElementById("url");
const perguntasInput = document.getElementById("perguntas");
const niveisInput = document.getElementById("niveis");

function recebendoConfigDoQuizz() {

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

    if(titulo.length < 20 || titulo.length > 65){
        alert("O Título do Quizz deve ter entre 20 e 65 caracteres :)");
        return
    } else if (!re.test(url) || url === "") {
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

    const numPerguntas = document.querySelector("#perguntas").value;
    let perguntasHTML =`<h3>Crie suas perguntas</h3>`;
    
    for (let i = 0; i < numPerguntas; i++) {
        perguntasHTML += `
            <div id="criarPergunta${i + 1}" class="criar-pergunta">
                <button class="button-editar ePergunta" type="button" onclick="colapsar(this)">
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

function colapsar(element){ // Para recolher seção na tela de criação das perguntas
    
    const inputsContainer = element.querySelectorAll(".criar-pergunta-container");
    const iconsEditar = element.querySelectorAll(".icon-editar");

    let cont = 0;
    if (element.classList.contains(".ePergunta")) {
        cont = document.querySelector("#perguntas").value;
    } else if (element.classList.contains(".eNivel")) {
        cont = document.querySelector("#niveis").value
    }

    for (let i = 0; i < cont; i++) {
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

    const numPerguntas = document.querySelector("#perguntas").value;

    for (let i = 0; i < numPerguntas; i++) {
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

    criarNiveis()
}

// Tela 3 - Níveis

const numNiveis = document.querySelector("#niveis").value;

function criarNiveis() {
    if (!criarQuizzPerguntas.classList.contains("escondido"))
        criarQuizzPerguntas.classList.add("escondido");
    
    if (criarQuizzNiveis.classList.contains("escondido"))
        criarQuizzNiveis.classList.remove("escondido");

    let niveisHTML = `<h3>Agora, decida os níveis</h3>`

    for (let i = 0; i < numNiveis; i++) {
        niveisHTML += `
            <div id="criarNiveis${i + 1}" class="criar-pergunta">
                <button class="button-editar eNivel" type="button" onclick="colapsar(this)">
                    <h4>Nível ${i + 1}</h4>
                    <ion-icon id="iconEditar${i + 1}" class="icon-editar" name="create-outline"></ion-icon>
                </button>    

                <div id="criarNivelContainer${i + 1}" class="criar-pergunta-container escondido">
                    <input id="input${i + 1}TituloNivel" type="text" placeholder="Título do nível" minlength="10">
                    <input id="input${i + 1}PercentualNivel" type="number" placeholder="% de acerto mínima">

                    <input id="input${i + 1}URLNivel" type="url" placeholder="URL da imagem" do nível>
                    <input id="input${i + 1}DescricaoNivel" type="text" placeholder="Descrição do nível" minlength="30">
                </div>
            </div>`;
    }
    criarQuizzNiveis.innerHTML += niveisHTML;
    criarQuizzNiveis.innerHTML += `<button class="button-proxima-tela" onclick="guardarNiveis()">Finalizar Quizz</button>`;

    criarQuizzNiveis.querySelector("#criarNivelContainer1").classList.remove("escondido");
    criarQuizzNiveis.querySelector("#iconEditar1").classList.add("escondido");
}

let arrayNiveis = [];

function guardarNiveis() {
    let inputTituloNivel = [];
    let inputPercentualNivel = [];
    let inputURLNivel = [];
    let inputDescricaoNivel = [];

    for (let i = 0; i < numNiveis; i++) {
        inputTituloNivel[i] = document.querySelector(`#input${i + 1}TituloNivel`).value;
        inputPercentualNivel[i] = document.querySelector(`#input${i + 1}PercentualNivel`).value;
        inputURLNivel[i] = document.querySelector(`#input${i + 1}URLNivel`).value;
        inputDescricaoNivel[i] = document.querySelector(`#input${i + 1}DescricaoNivel`).value;

        if (inputTituloNivel[i].length < 10) {
            alert(`O título do Nível ${i + 1} deve ter no mínimo 10 caracteres.`);
            return
        } else if (inputPercentualNivel[i] < 0 || inputPercentualNivel[i] > 100) {
            alert(`O percentual de acerto do Nível ${i + 1} deve estar entre 0 e 100.`);
            return
        } else if (!re.test(inputURLNivel[i])) {
            alert(`Insira uma URL válidapara a imagem do Nível ${i + 1}.`);
            return
        } else if (inputDescricaoNivel[i].length < 30) {
            alert(`A descrição do Nível ${i + 1} deve ter no mínimo 30 caracteres.`);
            return
        } else if (inputPercentualNivel.indexOf("0") === -1) {
            alert(`Deve exitir pelo menos um Nível com percentual de acerto igual a 0.`);
            return
        }

        arrayNiveis[i].push(
            {
                title: inputTituloNivel[i],
                image: inputURLNivel[i],
                text: inputDescricaoNivel[i],
                minValue: inputPercentualNivel[i]
            }
        )
    }

    criarQuizzNiveis.classList.add("escondido");

    gerarObjetoQuizz()
}

function gerarObjetoQuizz() {
    quizzCriado = {
        title: document.querySelector("#titulo").value,
        image: document.querySelector("#url").value,
        questions: arrayPerguntas,
        levels: arrayNiveis
    }

    axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzCriado)
        .then(response => console.log(response.status))
        .catch(err => console.log(err));
    
    criarQuizzResultado()
}


// Tela 4 - Sucesso

function criarQuizzResultado() {
    if (!criarQuizzNiveis.classList.contains("escondido"))
        criarQuizzNiveis.classList.add("escondido");

    if (criarQuizzSucesso.classList.contains("escondido"))
        criarQuizzSucesso.classList.remove("escondido");
    
    // ----------- Teste -----------
    //document.querySelector("#titulo").value = "O quão Potterhead é você?";
    //document.querySelector("#url").value = "https://img1.looper.com/img/gallery/harry-potter-character-endings-ranked-from-worst-to-best/l-intro-1605742258.jpg";

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
