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

const quizResultado = document.querySelector('#quiz-resultado')
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
        tipos: [
            {nome: 'COEFICIENTES CONSTANTES', texto: 'Você é uma pessoa direta e fiel a seus princípios, mas também pronta para se adaptar a diferentes circunstâncias que a vida oferece. A solução para todos os seus problemas será:', solucao: '$$y(x) = e^{-\\int p(x) \\, dx} \\left( \\int q(x) e^{\\int p(x) \\, dx} \\, dx + C \\right)$$'},
            {nome: 'COEFICIENTES VARIÁVEIS', texto: 'Você é uma pessoa pronta para se adaptar a qualquer situação, que abraça as mudanças que lhe aparecem e que não gosta de ficar num mesmo lugar por muito tempo. A solução para todos os seus problemas será:', solucao: '$$y(x) = e^{-\\int p(x) \\, dx} \\left( \\int q(x) e^{\\int p(x) \\, dx} \\, dx + C \\right)$$'}
        ]
    },
    {
        nome: 'EDO LINEAR HOMOGENEA DE PRIMEIRA ORDEM',
        contador: 0,
        linear: true,
        ordem: 1,
        homogenea: true,
        coeficientes: null,
        tipos: [{nome: ' ', texto: 'Você é uma pessoa simples, direta e fiel a seus princípios, muitas vezes tendo sua importância subestimada pelos outros. A solução para todos os seus problemas será: ', solucao: '$$y(x) = Ce^{-\\int p(x) \\, dx}$$'}]
    },
    {
        nome: 'EDO NÃO LINEAR DE PRIMEIRA ORDEM',
        contador: 0,
        linear: false,
        ordem: 1,
        homogenea: false,
        coeficientes: null,
        tipos: [
            {nome: 'SEPARÁVEL', texto: 'Você é uma pessoa que abraça as mudanças que o caminho lhe oferece e se adapta bem à elas, ao mesmo tempo tem bem definidas e separadas as partes de sua vida. A solução para todos os seus problemas será:', solucao: ''},
            {nome: 'HOMOGÊNEA', texto: 'Você é uma pessoa que abraça as mudanças que a vida lhe oferece e se adapta bem à elas, mas, ao mesmo tempo, é uma pessoa fiel a seus princípios e que gosta da zona de conforto. A solução para todos os seus problemas será:', solucao: ''},
            {nome: 'EXATA', texto: 'Você é uma pessoa que abraça as mudanças que a vida lhe oferece e se adapta bem a elas, mas, ao mesmo tempo, se mantém firme a seus ideais e permanece racional e imparcial quando necessário. A solução para todos os seus problemas será:', solucao: ''},
            {nome: 'NÃO EXATA', texto: 'Você é uma pessoa que abraça as mudanças que a vida lhe oferece e se adapta bem à elas, mas, ao mesmo tempo, não tem medo de assumir um lado e ser parcial quando a situação necessita. A solução para todos os seus problemas será:', solucao: ''}
        ]
    },
    {
        nome: 'EDO LINEAR HOMOGENEA DE SEGUNDA ORDEM COM COEFICIENTES CONSTANTES',
        contador: 0,
        linear: true,
        ordem: 2,
        homogenea: true,
        coeficientes: null,
        tipos: [
            {nome: '\\Delta > 0', texto: 'Você é uma pessoa um tanto complexa, mas que é muito fiel a seus ideais e objetivos e leal às pessoas a sua volta. Você tende a ser bem real e positivo/otimista sobre a vida e gosta de achar soluções concretas para seus problemas. A solução para todos os seus problemas é:', solucao: ' '},
            {nome: '\\Delta = 0', texto: 'Você é uma pessoa um tanto complexa, mas que é muito fiel a seus ideais e objetivos e leal às pessoas a sua volta. Você tende a ser bem realista e neutro sobre a vida e gosta de achar uma única solução concreta para seus problemas. A solução para todos os seus problemas é:', solucao: ' '},
            {nome: '\\Delta < 0', texto: 'Você é uma pessoa um tanto complexa, mas que é muito fiel a seus ideais e objetivos e leal às pessoas a sua volta. Você tende a andar com a cabeça nas nuvens e ser bem criativo, e gosta de achar soluções imaginativas para o dia a dia. A solução para todos os seus problemas é:', solucao: ' '}
        ]
    },
    {
        nome: 'EDO LINEAR NÃO HOMOGENEA DE SEGUNDA ORDEM COM COEFICIENTES CONSTANTES',
        contador: 0,
        linear: true,
        ordem: 2,
        homogenea: false,
        coeficientes: null,
        tipos: [{nome: ' ', texto: 'Você é uma pessoa um tanto complexa, que no final das contas é uma junção de seus dois lados opostos. Um lado que adora se manter constante e fiel a seus ideais e bases, e outro que também adora uma mudança de ares e de situações. A solução para todos os seus problemas é:', solucao: ' '}]
    }
]



function mostrarResultado(){
    quizResultado.style.display = 'block'
    const nomeEDO = quizResultado.querySelector('#edo-nome')
    const textoEDO = quizResultado.querySelector('#edo-texto')
    const solucaoEDO = quizResultado.querySelector('#edo-solucao')

    let resultado = null
    let maiorContador = 0
    respostas.forEach((resposta)=>{
        if (resposta.contador > maiorContador){
            maiorContador = resposta.contador
            resultado = resposta
        }
    })

    nomeEDO.innerHTML = resultado.nome
    textoEDO.innerHTML = resultado.tipos[0].texto
    solucaoEDO.innerHTML = resultado.tipos[0].solucao

    if (respostaDetalhes.raizes){
        if (respostaDetalhes.raizes === '\\Delta > 0'){
            nomeEDO.parentElement.innerHTML += `, cuja equação característica possui duas raízes reais distintas $$${respostaDetalhes.raizes}$$`
        }
        if (respostaDetalhes.raizes === '\\Delta = 0'){
            nomeEDO.parentElement.innerHTML += `, cuja equação característica possui duas raízes reais idênticas $$${respostaDetalhes.raizes}$$`
        }
        if (respostaDetalhes.raizes === '\\Delta < 0'){
            nomeEDO.parentElement.innerHTML += `, cuja equação característica possui duas raízes imaginárias distintas $$${respostaDetalhes.raizes}$$`
        }
    }

    if (respostaDetalhes.tipo){
        nomeEDO.parentElement.innerHTML += ` NA FORMA ${respostaDetalhes.tipo}`
    }

    if (respostaDetalhes.coeficientes){
        nomeEDO.parentElement.innerHTML += ` COM ${respostaDetalhes.coeficientes}`
    }



    renderMathInElement(quizResultado)
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

                respostas[0].tipos = respostas[0].tipos.filter((tipo)=>{
                        return tipo.nome === 'COEFICIENTES CONSTANTES'
                })

                respostaDetalhes.coeficientes = 'COEFICIENTES CONSTANTES'
            }

            if (respostaAtual === 'B'){
                respostas.forEach((resposta)=>{
                    if (resposta.coeficientes === false){
                        resposta.contador += 1
                    }
                })

                respostas[0].tipos = respostas[0].tipos.filter((tipo)=>{
                        return tipo.nome === 'COEFICIENTES VARIÁVEIS'
                })

                respostaDetalhes.coeficientes = 'COEFICIENTES VARIÁVEIS'
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

                respostas[2].tipos = respostas[2].tipos.filter((tipo)=>{
                        return tipo.nome === 'SEPARÁVEL'
                })
                respostaDetalhes.tipo = 'SEPARÁVEL'
            }

            if (respostaAtual === 'B'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 1 && resposta.linear === false){
                        resposta.contador += 1
                    }
                })

                respostas[2].tipos = respostas[2].tipos.filter((tipo)=>{
                        return tipo.nome === 'HOMOGÊNEA'
                })
                respostaDetalhes.tipo = 'HOMOGÊNEA'
            }

            if (respostaAtual === 'C'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 1 && resposta.linear === false){
                        resposta.contador += 1
                    }
                })

                respostas[2].tipos = respostas[2].tipos.filter((tipo)=>{
                        return tipo.nome === 'EXATA'
                })
                respostaDetalhes.tipo = 'EXATA'
            }

            if (respostaAtual === 'D'){
                respostas.forEach((resposta)=>{
                  if (resposta.ordem === 1 && resposta.linear === false){
                        resposta.contador += 1
                    }
                })

                respostas[2].tipos = respostas[2].tipos.filter((tipo)=>{
                        return tipo.nome === 'NÃO EXATA'
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

                respostas[3].tipos = respostas[3].tipos.filter((tipo)=>{
                        return tipo.nome === '\\Delta > 0'
                })

                respostaDetalhes.raizes = '\\Delta > 0'
            }

            if (respostaAtual === 'B'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 2 && resposta.linear === true && resposta.homogenea === true){
                        resposta.contador += 1
                    }
                })

                respostas[3].tipos = respostas[3].tipos.filter((tipo)=>{
                        return tipo.nome === '\\Delta = 0'
                })

                respostaDetalhes.raizes = '\\Delta = 0'
            }

            if (respostaAtual === 'C'){
                respostas.forEach((resposta)=>{
                    if (resposta.ordem === 2 && resposta.linear === true && resposta.homogenea === true){
                        resposta.contador += 1
                    }
                })

                respostas[3].tipos = respostas[3].tipos.filter((tipo)=>{
                        return tipo.nome === '\\Delta < 0'
                })

                respostaDetalhes.raizes = '\\Delta < 0'
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
