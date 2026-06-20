// ============================
// CARDÁPIO
// ============================

const pratos = [
  {
    nome: "Hambúrguer",
    preco: 25.00,
    imagem: "img/hamburguer.jpg"
  },
  {
    nome: "Pizza",
    preco: 40.00,
    imagem: "img/pizza.jpg"
  },
  {
    nome: "Batata Frita",
    preco: 15.00,
    imagem: "img/batata.jpg"
  },
  {
    nome: "Refrigerante",
    preco: 8.00,
    imagem: "img/refri.jpg"
  }
];


// ============================
// ELEMENTOS DA TELA
// ============================

const listaPratos = document.getElementById("lista-pratos");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalSpan = document.getElementById("total");

// ============================
// ESTADO DO SISTEMA
// ============================

let carrinho = [];
let total = 0;

// ============================
// FUNÇÃO ATUALIZAR CARRINHO
// ============================

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
  <div class="item-info">
    <strong>${item.nome}</strong>
    <span>Qtd: ${item.qtd}</span>
  </div>

  <div class="item-acoes">
    <span class="preco">R$ ${(item.preco * item.qtd).toFixed(2)}</span>
    <div class="botoes-qtd">
      <button onclick="diminuirQtd(${index})">−</button>
      <button onclick="aumentarQtd(${index})">+</button>
    </div>
  </div>
`;


    listaCarrinho.appendChild(li);
    total += item.preco * item.qtd;
  });

  totalSpan.textContent = total.toFixed(2);
}

// ============================
// FUNÇÕES DE QUANTIDADE
// ============================

function aumentarQtd(index) {
  carrinho[index].qtd++;
  atualizarCarrinho();
}

function diminuirQtd(index) {
  carrinho[index].qtd--;

  if (carrinho[index].qtd <= 0) {
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();
}

// ============================
// MOSTRAR CARDÁPIO
// ============================

pratos.forEach((prato) => {
  const div = document.createElement("div");
  div.classList.add("prato");

  const botao = document.createElement("button");
  botao.textContent = "Adicionar";

  botao.addEventListener("click", () => {
    const itemExistente = carrinho.find(item => item.nome === prato.nome);

    if (itemExistente) {
      itemExistente.qtd++;
    } else {
      carrinho.push({
        nome: prato.nome,
        preco: prato.preco,
        qtd: 1
      });
    }

    atualizarCarrinho();
  });

 div.innerHTML = `
  <img
    src="${prato.imagem}"
    alt="${prato.nome}"
    loading="lazy"
    decoding="async"
    width="400"
    height="300"
  >
  <div class="prato-info">
    <h3>${prato.nome}</h3>
    <p>R$ ${prato.preco.toFixed(2)}</p>
  </div>
`;


  div.appendChild(botao);
  listaPratos.appendChild(div);
});

const botaoFinalizar = document.getElementById("finalizar-pedido");

botaoFinalizar.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("total", total.toFixed(2));

  window.location.href = "checkout.html";
});
