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