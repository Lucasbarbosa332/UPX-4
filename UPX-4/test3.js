let userLoggedIn = false;
let denuncias = [];
let pontosTotais = 0;

document.getElementById("loginButton").addEventListener("click", () => {
    document.getElementById("loginForm").classList.toggle("hidden");
});

function loginUser() {
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;

    if (userName && userEmail) {
        userLoggedIn = true;
        document.getElementById("loginForm").classList.add("hidden");
        document.getElementById("userGreeting").classList.remove("hidden");
        document.getElementById("userGreeting").textContent = `Olá, ${userName}`;
    }
}

function showSection(sectionId) {
    document.querySelectorAll("main > section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");

    if (sectionId === 'denuncias') {
        updateDenuncias();
    }
}

function submitDenuncia(event) {
    event.preventDefault();
    const denuncia = {
        cep: document.getElementById("cep").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        pais: document.getElementById("pais").value,
        descricao: document.getElementById("descricao").value,
        imagem: document.getElementById("imagem").files[0] || null,
    };
    
    denuncias.push(denuncia);
    pontosTotais += 10;
    alert("Denúncia bem sucedida!");
    updatePontos();
}

function updateDenuncias() {
    const denunciasList = document.getElementById("denunciasList");
    denunciasList.innerHTML = "";  // Limpa a lista antes de adicionar novas denúncias

    denuncias.forEach((denuncia) => {
        const card = document.createElement("div");
        card.classList.add("card-denuncia");
        card.innerHTML = `
            <p><strong>CEP:</strong> ${denuncia.cep}</p>
            <p><strong>Bairro:</strong> ${denuncia.bairro}</p>
            <p><strong>Cidade:</strong> ${denuncia.cidade}</p>
            <p><strong>Estado:</strong> ${denuncia.estado}</p>
            <p><strong>País:</strong> ${denuncia.pais}</p>
            <p><strong>Descrição:</strong> ${denuncia.descricao}</p>
        `;
        denunciasList.appendChild(card);
    });
}

function updatePontos() {
    document.getElementById("pontosTotais").textContent = pontosTotais;
    document.getElementById("resgatarPontos").disabled = pontosTotais < 10;
}


let map;  // Variável para o mapa
let marker;  // Variável para o marcador

// Função para inicializar o mapa
function initMap() {
    map = L.map('map').setView([-15.7801, -47.9292], 13);  // Coordenadas iniciais

    // Adicionar o mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Marcar um ponto clicado no mapa
    map.on('click', function(e) {
        if (marker) {
            map.removeLayer(marker);  // Remove o marcador anterior
        }
        marker = L.marker(e.latlng).addTo(map);  // Adiciona o marcador
        document.getElementById('cep').value = e.latlng.lat.toFixed(4);  // Preenche o campo CEP com a latitude
        document.getElementById('bairro').value = e.latlng.lng.toFixed(4);  // Preenche o campo Bairro com a longitude
    });
}

// Inicializa o mapa assim que a página carregar
window.onload = initMap;
