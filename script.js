function showExampleCharacters() {
    const exampleCharacters = document.getElementById("exampleCharacters");
    exampleCharacters.innerHTML = "<strong>Exemplos:</strong> ABCDEFabcdef0123456#@";
}

const gerarSenhaBotao = document.getElementById("generatePassword");
const campoSenha = document.getElementById("password");
const criptografarBotao = document.getElementById("encrypt");
const campoSenhaCriptografada = document.getElementById("encryptedPassword");
const campoTamanhoSenha = document.getElementById("passwordLength");
const campoConjuntoCaracteres = document.getElementById("characterSet");
const errorMessage = document.getElementById("errorMessage");
const pixContainer = document.getElementById("pixContainer");
const pixKeyInput = document.getElementById("pixKey");

gerarSenhaBotao.addEventListener("click", () => {
    const tamanho = parseInt(campoTamanhoSenha.value);
    const conjuntoCaracteres = campoConjuntoCaracteres.value;

    if (!conjuntoCaracteres) {
        errorMessage.textContent = "Por favor, insira os caracteres para gerar a senha.";
        errorMessage.style.display = "block";
    } else {
        const senha = gerarSenhaAleatoria(tamanho, conjuntoCaracteres);
        campoSenha.value = senha;
        criptografarBotao.disabled = false; // Enable encrypt button
        errorMessage.style.display = "none";
    }
});

criptografarBotao.addEventListener("click", async () => {
    const senha = campoSenha.value;
    try {
        const senhaCriptografada = await criptografarSenha(senha);
        campoSenhaCriptografada.value = senhaCriptografada;
    } catch (error) {
        campoSenhaCriptografada.value = "Erro ao criptografar a senha.";
        console.error(error);
    }
});

function gerarSenhaAleatoria(tamanho, conjuntoCaracteres) {
    let senha = "";
    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * conjuntoCaracteres.length);
        senha += conjuntoCaracteres.charAt(indiceAleatorio);
    }
    return senha;
}

async function criptografarSenha(senha) {
    const codificador = new TextEncoder();
    const dados = codificador.encode(senha);
    const bufferHash = await crypto.subtle.digest("SHA-256", dados);
    const arrayHash = Array.from(new Uint8Array(bufferHash));
    const senhaCriptografada = arrayHash.map(byte => byte.toString(16).padStart(2, "0")).join("");
    return senhaCriptografada;
}
