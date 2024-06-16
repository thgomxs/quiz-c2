let perguntaIndex = 0

let respostaDetalhes = {
    ordem: null,
    linear: null,
    homogenea: null,
    coeficientes: null,
    tipo: null,
    raizes: null,
}
let respostaAtual = null
let perguntaAtual = null

const quizResultadoSolucoes = document.querySelectorAll(".quiz-resultado-solucao")
const quizNome = document.querySelector("#quiz-nome")
const quizReplayButton = document.querySelector("#quiz-replay-btn")

const inicarButton = document.querySelector('#iniciar-btn');
const desenvolvedoresButton = document.querySelector('#desenvolvedores-btn');
const proximaButton = document.querySelector('#proxima-btn');

const perguntaContainer = document.querySelector('#pergunta-container');
const perguntaTitulo = document.querySelector('#pergunta-titulo');
const escolhas = document.querySelectorAll('.escolha');
const escolhaA = document.querySelector('#escolha-a');
const escolhaB = document.querySelector('#escolha-b');
const escolhaC = document.querySelector('#escolha-c');
const escolhaD = document.querySelector('#escolha-d');



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
    },
    {
    titulo: 'Você costuma se manter firme e constante nas suas opiniões ou você deixa elas serem influenciadas e alteradas pelo meio e por circunstâncias externas?',
    tipo: 'coeficientes',
    opcoes: {a: 'Me mantenho constante', b: 'Mudo conforme as circunstâncias'}
    },
    {
    titulo: 'Qual atitude você tomaria caso visse dois de seus amigos brigando?',
    tipo: 'tipo',
    opcoes: {a: 'Tentaria separar a briga', b: 'Correria da briga ', c: 'Tentaria ser imparcial com ambos os lados da discussão', d: 'Seria parcial para um lado'}
    },
    {
    titulo:'Você costuma ser uma pessoa otimista, neutra ou pessimista?',
    tipo: 'raizes',
    opcoes: {a: 'Otimista', b: 'Neutra', c: 'Pessimista'}
    }
]

let respostas = [
    {
        nome: 'EDO LINEAR NÃO HOMOGENEA DE PRIMEIRA ORDEM',
        contador: 0,
        linear: true,
        ordem: 1,
        homogenea: false,
    },
    {
        nome: 'EDO LINEAR HOMOGENEA DE PRIMEIRA ORDEM',
        contador: 0,
        linear: true,
        ordem: 1,
        homogenea: true,
        coeficientes: null,
    },
    {
        nome: 'EDO NÃO LINEAR DE PRIMEIRA ORDEM',
        contador: 0,
        linear: false,
        ordem: 1,
        homogenea: false,
        coeficientes: null,
    },
    {
        nome: 'EDO LINEAR HOMOGENEA DE SEGUNDA ORDEM',
        contador: 0,
        linear: true,
        ordem: 2,
        homogenea: true,
        coeficientes: null,
    },
    {
        nome: 'EDO LINEAR NÃO HOMOGENEA DE SEGUNDA ORDEM',
        contador: 0,
        linear: true,
        ordem: 2,
        homogenea: false,
        coeficientes: null,
    }
]



function mostrarResultado(){
    let resultado = null
    let maiorContador = 0
    respostas.forEach((resposta)=>{
        if (resposta.contador > maiorContador){
            maiorContador = resposta.contador
            resultado = resposta
        }
    })

    if (respostaDetalhes.ordem === 1 && respostaDetalhes.homogenea === false){
        if (respostaDetalhes.coeficientes === true){
            document.querySelector("#edo-nao-homogenea").innerHTML += " COM COEFICIENTES CONSTANTES"
        }
        if (respostaDetalhes.coeficientes === false){
            document.querySelector("#edo-nao-homogenea").innerHTML += " COM COEFICIENTES VARIÁVEIS"
        }
    }

    if (respostaDetalhes.ordem === 1 && respostaDetalhes.linear === false){
        document.querySelector("#edo-nao-linear").innerHTML += ` ${respostaDetalhes.tipo}`
    }

    if (respostaDetalhes.ordem === 2 && respostaDetalhes.homogenea === true){
        document.querySelector("#edo-raizes").innerHTML += ` COM COEFICIENTES CONSTANTES E ${respostaDetalhes.raizes}`
    }


    quizResultadoSolucoes.forEach((solucao)=>{
        solucao.querySelector('h1').innerHTML = `Parabéns! Você recebeu: <span class="text-primary">${resultado.nome}</span>`

        let nomeEdo = solucao.getAttribute("data-edo")
        console.log(nomeEdo, resultado.nome, nomeEdo === resultado.nome)
        if (nomeEdo === resultado.nome){
            solucao.style.display = "flex"
        }
    })
    perguntaContainer.style.display = 'none'
    quizReplayButton.style.display = 'block'

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

    if (perguntaIndex === 4){
        escolhaC.style.display = 'block'
        escolhaD.style.display = 'block'
        escolhaC.innerHTML = perguntaAtual.opcoes.c
        escolhaD.innerHTML = perguntaAtual.opcoes.d
    } else if (perguntaIndex === 5){
        escolhaC.style.display = 'block'
        escolhaD.style.display = 'none'
        escolhaC.innerHTML = perguntaAtual.opcoes.c
    } else{
        escolhaC.style.display = 'none'
        escolhaD.style.display = 'none'
    }

}
atualizarPergunta()


function proximaPergunta(){
    perguntaIndex++

    if (perguntaAtual.tipo === 'ordem'){
        if (respostaAtual === 'A'){
            respostas.forEach((resposta)=>{
                if (resposta.ordem === 1){
                    resposta.contador += 1
                }
            })
            respostaDetalhes.ordem = 1
        }
        if (respostaAtual === 'B'){
            respostas.forEach((resposta)=>{
                if (resposta.ordem === 2){
                    resposta.contador += 1
                }
            })
            respostaDetalhes.ordem = 2
            respostaDetalhes.linear = true
            respostaDetalhes.coeficientes = true
        }
    }

    if (perguntaAtual.tipo === 'linear'){
        if (respostaDetalhes.ordem !== 2){
            if (respostaAtual === 'A'){
                respostas.forEach((resposta)=>{
                    if (resposta.linear === true){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.linear = true
            }
            if (respostaAtual === 'B'){
                respostas.forEach((resposta)=>{
                    if (resposta.linear === false){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.linear = false
            }
        }
    }

    if (perguntaAtual.tipo === 'homogenea'){
        if (respostaDetalhes.linear === true){
            if (respostaAtual === 'A'){
                respostas.forEach((resposta)=>{
                    if (resposta.homogenea === true){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.homogenea = true
            }

            if (respostaAtual === 'B'){
                respostas.forEach((resposta)=>{
                    if (resposta.homogenea === false){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.homogenea = false
            }
        }
    }

    if (perguntaAtual.tipo === 'coeficientes'){
        if (respostaDetalhes.homogenea === false && respostaDetalhes.ordem === 1){
            if (respostaAtual === 'A'){
                respostas.forEach((resposta)=>{
                    if (resposta.coeficientes === true){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.coeficientes = true
            }

            if (respostaAtual === 'B'){
                respostas.forEach((resposta)=>{
                    if (resposta.coeficientes === false){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.coeficientes = false
            }
        }
    }

    if (perguntaAtual.tipo === 'tipo'){
        if (respostaDetalhes.linear === false && respostaDetalhes.ordem === 1){
            if (respostaAtual === 'A'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 1 && resposta.linear === false){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.tipo = 'SEPARÁVEL'
            }

            if (respostaAtual === 'B'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 1 && resposta.linear === false){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.tipo = 'HOMOGÊNEA'
            }

            if (respostaAtual === 'C'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 1 && resposta.linear === false){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.tipo = 'EXATA'
            }

            if (respostaAtual === 'D'){
                respostas.forEach((resposta)=>{
                  if (resposta.ordem === 1 && resposta.linear === false){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.tipo = 'NÃO EXATA'
            }
        }
    }

    if (perguntaAtual.tipo === 'raizes'){
        if (respostaDetalhes.linear === true && respostaDetalhes.homogenea === true && respostaDetalhes.ordem === 2){
            if (respostaAtual === 'A'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 2 && resposta.linear === true && resposta.homogenea === true){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.raizes = 'DELTA > 0'
            }

            if (respostaAtual === 'B'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 2 && resposta.linear === true && resposta.homogenea === true){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.raizes = 'DELTA = 0'
            }

            if (respostaAtual === 'C'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 2 && resposta.linear === true && resposta.homogenea === true){
                        resposta.contador += 1
                    }
                })
                respostaDetalhes.raizes = 'DELTA < 0'
            }

        }
    }

    console.log(respostas)

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
