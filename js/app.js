
let perguntaIndex = 0
let respostaDetalhes = {
    ordem: null,
    linear: null,
    homogenea: null
}
let respostaAtual = null
let perguntaAtual = null

const quizNome = document.querySelector("#quiz-nome")
const quizResultado = document.querySelector("#quiz-resultado")
const quizReplayButton = document.querySelector("#quiz-replay-btn")

const inicarButton = document.querySelector('#iniciar-btn');
const desenvolvedoresButton = document.querySelector('#desenvolvedores-btn');
const proximaButton = document.querySelector('#proxima-btn');

const perguntaContainer = document.querySelector('#pergunta-container');
const perguntaTitulo = document.querySelector('#pergunta-titulo');
const escolhas = document.querySelectorAll('.escolha');
const escolhaA = document.querySelector('#escolha-a');
const escolhaB = document.querySelector('#escolha-b');



const perguntas = [
    {
    titulo: 'Você toma decisões rapidamente ou pondera duas vezes antes de decidir?',
    tipo: 'ordem',
    opcoes: {a: 'Decido rapidamente', b: 'Pondero duas vezes'}
    },
    {
    titulo: 'Sua reação emocional a um filme triste é proporcionalmente triste, ou você mergulha em um mar de emoções, desde lágrimas até gargalhadas descontroladas?',
    tipo: 'linear',
    opcoes: {a: 'Proporcionalmente triste', b: 'Mar de emoções'}
    },
    {
    titulo: 'Quando te convidam para sair, você sempre diz \'sim\' de maneira uniforme ou sua resposta varia dependendo de outros fatores como o clima e seu humor?',
    tipo: 'homogenea',
    opcoes: {a: 'Sempre "sim"', b: 'Depende de fatores'}
    }
]

let respostas = [
    {
        nome: 'EDO LINEAR NÃO HOMOGENEA DE PRIMEIRA ORDEM',
        linear: true,
        ordem: 1,
        homogenea: false
    },
    {
        nome: 'EDO LINEAR HOMOGENEA DE PRIMEIRA ORDEM',
        linear: true,
        ordem: 1,
        homogenea: true
    },
    {
        nome: 'EDO NÃO LINEAR HOMOGENEA DE PRIMEIRA ORDEM',
        linear: false,
        ordem: 1,
        homogenea: true
    },
    {
        nome: 'EDO NÃO LINEAR NÃO HOMOGENEA DE PRIMEIRA ORDEM',
        linear: false,
        ordem: 1,
        homogenea: false
    },
    {
        nome: 'EDO LINEAR HOMOGENEA DE SEGUNDA ORDEM',
        linear: true,
        ordem: 2,
        homogenea: true
    },
    {
        nome: 'EDO LINEAR NÃO HOMOGENEA DE SEGUNDA ORDEM',
        linear: true,
        ordem: 2,
        homogenea: false
    }
]




function mostrarResultado(){
    if (respostas.length === 1){
        quizResultado.innerHTML = `VOCÊ É UMA <span class="text-primary"> ${respostas[0].nome}</span>`
        quizResultado.style.display = 'block'
        perguntaContainer.style.display = 'none'
        quizReplayButton.style.display = 'block'
    }
}

function limparRespostas(){
    escolhas.forEach((escolha)=>{
        if (escolha.classList.contains('selected')) {
            escolha.classList.remove('selected');
        }
    })
}

function atualizarPergunta() {
    perguntaAtual = perguntas[perguntaIndex]

    perguntaTitulo.innerHTML = `${perguntaIndex + 1}. ${perguntaAtual.titulo}`
    escolhaA.innerHTML = perguntaAtual.opcoes.a
    escolhaB.innerHTML = perguntaAtual.opcoes.b
}
atualizarPergunta()


function proximaPergunta(){
    perguntaIndex++
    console.log(perguntaIndex, (perguntas.length - 1))

    let apagar = []
    console.log(respostaAtual, perguntaAtual)
    if (perguntaAtual.tipo === 'ordem'){
        if (respostaAtual === 'A'){
            respostas.forEach((resposta)=>{
                if (resposta.ordem === 2){
                    apagar.push(resposta.nome)
                }
            })
            respostaDetalhes.ordem = 1
        }
        if (respostaAtual === 'B'){
            respostas.forEach((resposta)=>{
                if (resposta.ordem === 1){
                    apagar.push(resposta.nome)
                }
            })
            respostaDetalhes.ordem = 2
        }
    }

    if (perguntaAtual.tipo === 'linear'){
        if (respostaDetalhes.ordem !== 2){
            if (respostaAtual === 'A'){
                respostas.forEach((resposta)=>{
                    if (resposta.linear === false){
                        apagar.push(resposta.nome)

                    }
                })
                respostaDetalhes.linear = true
            }
            if (respostaAtual === 'B'){
                respostas.forEach((resposta)=>{
                    if (resposta.linear === true){
                        apagar.push(resposta.nome)
                    }
                })
                respostaDetalhes.linear = false
            }
        }
    }

    if (perguntaAtual.tipo === 'homogenea'){
        if (respostaAtual === 'A'){
            respostas.forEach((resposta)=>{
                if (resposta.homogenea === false){
                    apagar.push(resposta.nome)
                }
            })
            respostaDetalhes.homogenea = true
        }

        if (respostaAtual === 'B'){
            respostas.forEach((resposta)=>{
                if (resposta.homogenea === true){
                    apagar.push(resposta.nome)
                }
            })
            respostaDetalhes.homogenea = false
        }
    }
    apagar.forEach((nome)=>{
        respostas = respostas.filter(resposta => resposta.nome !== nome)
    })
    if (perguntaIndex === perguntas.length){
        mostrarResultado()
    } else {
        proximaButton.style.display = 'none';
        limparRespostas()
        atualizarPergunta()
    }



}


inicarButton.addEventListener('click', () => {
    quizNome.style.display = 'none';
    inicarButton.style.display = 'none';
    desenvolvedoresButton.style.display = 'none';
    perguntaContainer.style.display = 'flex';
})

escolhas.forEach((escolha)=>{
    escolha.addEventListener('click', ()=>{
        limparRespostas()
        escolha.classList.add('selected');
        respostaAtual = escolha.getAttribute('data-option');
        proximaButton.style.display = 'block';
    })
})

proximaButton.addEventListener('click', () => {
    proximaPergunta()
})
