let participantes = {};
let numeroSelecionado = null;

const TOTAL_NUMEROS = 81;

const gridNumeros = document.getElementById("grid-numeros");
const modalNome = document.getElementById("modal-nome");
const modalTitulo = document.getElementById("modal-titulo");
const inputNome = document.getElementById("input-nome");
const btnConfirmarNome = document.getElementById("btn-confirmar-nome");
const btnCancelarNome = document.getElementById("btn-cancelar-nome");

const btnVerJogadores = document.getElementById("btn-ver-jogadores");
const modalJogadoresFullscreen = document.getElementById("modal-jogadores-fullscreen");
const listaJogadoresCompleta = document.getElementById("lista-jogadores-completa");
const btnFecharJogadores = document.getElementById("btn-fechar-jogadores");

const btnVencedor = document.getElementById("btn-vencedor");
const btnResetar = document.getElementById("btn-resetar");
const vencedorFullscreen = document.getElementById("vencedor-fullscreen");
const nomeVencedor = document.getElementById("nome-vencedor");
const numeroVencedor = document.getElementById("numero-vencedor");
const btnFecharVencedor = document.getElementById("btn-fechar-vencedor");

function inicializarGrid() {
    gridNumeros.innerHTML = "";
    for (let i = 1; i <= TOTAL_NUMEROS; i++) {
        const btn = document.createElement("button");
        btn.classList.add("num-btn");
        btn.textContent = i;
        btn.dataset.numero = i;

        if (participantes[i]) {
            btn.disabled = true;
        }

        btn.addEventListener("click", () => abrirModalNome(i));
        gridNumeros.appendChild(btn);
    }
}

function abrirModalNome(numero) {
    numeroSelecionado = numero;
    modalTitulo.textContent = `Número ${numero}`;
    inputNome.value = "";
    modalNome.style.display = "flex";
    inputNome.focus();
}

function fecharModalNome() {
    modalNome.style.display = "none";
    numeroSelecionado = null;
}

function confirmarNome() {
    const nome = inputNome.value.trim();
    if (!nome) {
        alert("Por favor, digite um nome.");
        return;
    }

    participantes[numeroSelecionado] = nome;

    const btn = gridNumeros.querySelector(`[data-numero="${numeroSelecionado}"]`);
    if (btn) {
        btn.disabled = true;
    }

    fecharModalNome();
}

function atualizarListaJogadores() {
    listaJogadoresCompleta.innerHTML = "";
    const numeros = Object.keys(participantes).sort((a, b) => Number(a) - Number(b));

    if (numeros.length === 0) {
        listaJogadoresCompleta.innerHTML = "<li style='justify-content: center;'>Nenhum participante ainda.</li>";
        return;
    }

    numeros.forEach((num) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${participantes[num]}</span><strong>${num}</strong>`;
        listaJogadoresCompleta.appendChild(li);
    });
}

function sortearVencedor() {
    const numeros = Object.keys(participantes);
    if (numeros.length === 0) {
        alert("Nenhum participante cadastrado para o sorteio!");
        return;
    }

    const numeroSorteado = numeros[Math.floor(Math.random() * numeros.length)];
    const nomeSorteado = participantes[numeroSorteado];

    nomeVencedor.textContent = nomeSorteado;
    numeroVencedor.textContent = numeroSorteado;
    vencedorFullscreen.style.display = "flex";
}

function resetarSorteio() {
    if (confirm("Tem certeza de que deseja resetar todo o sorteio?")) {
        participantes = {};
        inicializarGrid();
    }
}

btnConfirmarNome.addEventListener("click", confirmarNome);
btnCancelarNome.addEventListener("click", fecharModalNome);

inputNome.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        confirmarNome();
    }
});

btnVerJogadores.addEventListener("click", () => {
    atualizarListaJogadores();
    modalJogadoresFullscreen.style.display = "flex";
});

btnFecharJogadores.addEventListener("click", () => {
    modalJogadoresFullscreen.style.display = "none";
});

modalJogadoresFullscreen.addEventListener("click", (e) => {
    if (e.target === modalJogadoresFullscreen) {
        modalJogadoresFullscreen.style.display = "none";
    }
});

btnVencedor.addEventListener("click", sortearVencedor);
btnResetar.addEventListener("click", resetarSorteio);

btnFecharVencedor.addEventListener("click", () => {
    vencedorFullscreen.style.display = "none";
});

inicializarGrid();