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

function abrirModalNome(numero) {
    numeroSelecionado = numero;
    if (modalTitulo) {
        modalTitulo.textContent = `Número ${numero}`;
    }
    if (inputNome) {
        inputNome.value = "";
    }
    if (modalNome) {
        modalNome.style.display = "flex";
    }
    if (inputNome) {
        inputNome.focus();
    }
}

function inicializarGrid() {
    if (!gridNumeros) {
        return;
    }
    gridNumeros.innerHTML = "";
    for (let i = 1; i <= TOTAL_NUMEROS; i += 1) {
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

function fecharModalNome() {
    if (modalNome) {
        modalNome.style.display = "none";
    }
    numeroSelecionado = null;
}

function confirmarNome() {
    const nome = inputNome ? inputNome.value.trim() : "";
    if (!nome) {
        alert("Por favor, digite um nome.");
        return;
    }

    if (numeroSelecionado !== null) {
        participantes[numeroSelecionado] = nome;

        if (gridNumeros) {
            const btn = gridNumeros.querySelector(`[data-numero="${numeroSelecionado}"]`);
            if (btn) {
                btn.disabled = true;
            }
        }
    }

    fecharModalNome();
}

function atualizarListaJogadores() {
    if (!listaJogadoresCompleta) {
        return;
    }
    listaJogadoresCompleta.innerHTML = "";
    const numeros = Object.keys(participantes).sort((a, b) => Number(a) - Number(b));

    if (numeros.length === 0) {
        listaJogadoresCompleta.innerHTML = "<li style='justify-content: center;'>Nenhum participante ainda.</li>";
        return;
    }

    numeros.forEach((num) => {
        const li = document.createElement("li");
        const spanNome = document.createElement("span");
        spanNome.textContent = participantes[num];

        const strongNumero = document.createElement("strong");
        strongNumero.textContent = num;

        li.appendChild(spanNome);
        li.appendChild(strongNumero);
        listaJogadoresCompleta.appendChild(li);
    });
}

function sortearVencedor() {
    const numeros = Object.keys(participantes);
    if (numeros.length === 0) {
        alert("Nenhum participante cadastrado para o sorteio!");
        return;
    }

    const numerosComoNumeros = numeros.map(Number);
    const maiorNumero = Math.max(...numerosComoNumeros);
    const nomeSorteado = participantes[maiorNumero];

    if (nomeVencedor) {
        nomeVencedor.textContent = nomeSorteado;
    }
    if (numeroVencedor) {
        numeroVencedor.textContent = maiorNumero;
    }
    if (vencedorFullscreen) {
        vencedorFullscreen.style.display = "flex";
    }
}

function resetarSorteio() {
    if (confirm("Tem certeza de que deseja resetar todo o sorteio?")) {
        participantes = {};
        inicializarGrid();
    }
}

if (btnConfirmarNome) {
    btnConfirmarNome.addEventListener("click", confirmarNome);
}

if (btnCancelarNome) {
    btnCancelarNome.addEventListener("click", fecharModalNome);
}

if (inputNome) {
    inputNome.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            confirmarNome();
        }
    });
}

if (btnVerJogadores) {
    btnVerJogadores.addEventListener("click", () => {
        atualizarListaJogadores();
        if (modalJogadoresFullscreen) {
            modalJogadoresFullscreen.style.display = "flex";
        }
    });
}

if (btnFecharJogadores) {
    btnFecharJogadores.addEventListener("click", () => {
        if (modalJogadoresFullscreen) {
            modalJogadoresFullscreen.style.display = "none";
        }
    });
}

if (modalJogadoresFullscreen) {
    modalJogadoresFullscreen.addEventListener("click", (e) => {
        if (e.target === modalJogadoresFullscreen) {
            modalJogadoresFullscreen.style.display = "none";
        }
    });
}

if (btnVencedor) {
    btnVencedor.addEventListener("click", sortearVencedor);
}

if (btnResetar) {
    btnResetar.addEventListener("click", resetarSorteio);
}

if (btnFecharVencedor) {
    btnFecharVencedor.addEventListener("click", () => {
        if (vencedorFullscreen) {
            vencedorFullscreen.style.display = "none";
        }
    });
}

inicializarGrid();