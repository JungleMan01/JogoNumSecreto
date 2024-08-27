let ListaNumSorteados = [];
let numLimite = 10

let NumAleatorio = GerarNumAleatorio();
let tentativas = 1

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, `UK English Female`, {rate:1.2})
}

function mensagemInicial() {
exibirTexto(`h1`, `Jogo do número secreto`);
exibirTexto(`p`, `Escolha um número entre 1 e ${numLimite}`);
}

function verificarChute() {
    let chute = document.querySelector(`input`).value;
    
    if (chute == NumAleatorio) {
        let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`;
        let msgTentativas = `Você descobriu o número com ${tentativas} ${palavraTentativa}!`;
        exibirTexto(`h1`, `acertou!`);
        exibirTexto(`p`, msgTentativas);
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    }
    else {
        if (NumAleatorio > chute) {
            exibirTexto(`p`, `Um pouco mais`);
        } else {
            exibirTexto(`p`, `Um pouco menos`);
        }
        tentativas = (tentativas + 1);
        limparCampo();
    }
}

function GerarNumAleatorio() {
    console.log(ListaNumSorteados)
    let numEscolhido = parseInt(Math.random() * numLimite + 1);
    let qtdNumEscolhidos = ListaNumSorteados.length

    if (qtdNumEscolhidos == numLimite) {
        ListaNumSorteados = []
    }

    if (ListaNumSorteados.includes(numEscolhido)) {
        return GerarNumAleatorio();
    } else {
        ListaNumSorteados.push(numEscolhido);
        return numEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector(`input`)
    chute.value = ``;
}

function reiniciarJogo() {
    NumAleatorio = GerarNumAleatorio();
    limparCampo();
    tentativas = 1
    mensagemInicial();
    document.getElementById(`reiniciar`).setAttribute(`disabled`, false)
}

mensagemInicial()