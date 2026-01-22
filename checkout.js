const listaResumo = document.getElementById("resumo-itens");
const totalFinal = document.getElementById("total-final");

const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const total = localStorage.getItem("total");

carrinho.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${item.nome} (x${item.qtd})</span>
    <span>R$ ${(item.preco * item.qtd).toFixed(2)}</span>
  `;
  listaResumo.appendChild(li);
});

totalFinal.textContent = total;

document.getElementById("confirmar-pedido").addEventListener("click", () => {
  alert("Pedido realizado com sucesso! 🍔🎉");

  localStorage.clear();
  window.location.href = "index.html";
});
