const form = document.getElementById("form");
const lista = document.getElementById("lista");
const saldo = document.getElementById("saldo");
const entradas = document.getElementById("entradas");
const saidas = document.getElementById("saidas");
const submitButton = form.querySelector("button[type='submit']");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const fileInput = document.getElementById("fileInput");
const limparBtn = document.getElementById("limparBtn");
const mensagem = document.getElementById("mensagem");

const STORAGE_KEY = "gastosTransacoes";
let transacoes = [];
let editarId = null;

carregarTransacoes();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descricao = document.getElementById("descricao").value.trim();
  const valor = Number(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || valor <= 0) {
    alert("Preencha uma descrição e um valor maior que zero.");
    return;
  }

  if (editarId !== null) {
    transacoes = transacoes.map((item) =>
      item.id === editarId ? { ...item, descricao, valor, tipo } : item
    );
    editarId = null;
    submitButton.textContent = "Adicionar";
    mostrarMensagem("Transação atualizada!", "sucesso");
  } else {
    const transacao = {
      id: Date.now(),
      descricao,
      valor,
      tipo,
      data: new Date().toLocaleDateString("pt-BR")
    };

    transacoes.push(transacao);
    mostrarMensagem("Transação adicionada!", "sucesso");
  }

  salvarTransacoes();
  atualizarTela();
  form.reset();
});

exportBtn.addEventListener("click", exportarCSV);
importBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", importarCSV);
limparBtn.addEventListener("click", () => {
  if (confirm("Deseja realmente limpar TODAS as transações?")) {
    transacoes = [];
    salvarTransacoes();
    atualizarTela();
    mostrarMensagem("Dados limpos!", "sucesso");
  }
});

function carregarTransacoes() {
  const dados = localStorage.getItem(STORAGE_KEY);
  transacoes = dados ? JSON.parse(dados) : [];
  atualizarTela();
}

function salvarTransacoes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transacoes));
}

function atualizarTela(){
  lista.innerHTML = "";

  let total = 0;
  let totalEntradas = 0;
  let totalSaidas = 0;

  const transacoesOrdenadas = [...transacoes].sort((a, b) => {
    return new Date(b.data.split('/').reverse().join('-')) - new Date(a.data.split('/').reverse().join('-'));
  });

  transacoesOrdenadas.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className = item.tipo;
    tr.innerHTML = `
      <td>${item.data || "N/A"}</td>
      <td>${item.descricao}</td>
      <td><span class="tipo-badge ${item.tipo}">${item.tipo === "entrada" ? "📈 Entrada" : "📉 Saída"}</span></td>
      <td class="valor-celula ${item.tipo}">
        ${item.tipo === "entrada" ? "+" : "-"} ${formatCurrency(item.valor)}
      </td>
      <td class="acoes-celula">
        <button class="edit" data-id="${item.id}" type="button">✏️</button>
        <button class="delete" data-id="${item.id}" type="button">🗑️</button>
      </td>
    `;

    lista.appendChild(tr);

    if(item.tipo === "entrada"){
      total += item.valor;
      totalEntradas += item.valor;
    }else{
      total -= item.valor;
      totalSaidas += item.valor;
    }
  });

  saldo.innerHTML = formatCurrency(total);
  saldo.className = total >= 0 ? "positivo" : "negativo";
  entradas.innerHTML = formatCurrency(totalEntradas);
  saidas.innerHTML = formatCurrency(totalSaidas);

  document.querySelectorAll(".edit").forEach(button => {
    button.addEventListener("click", () => {
      iniciarEdicao(Number(button.dataset.id));
    });
  });

  document.querySelectorAll(".delete").forEach(button => {
    button.addEventListener("click", () => {
      deletarTransacao(Number(button.dataset.id));
    });
  });
}

function iniciarEdicao(id) {
  const item = transacoes.find((transacao) => transacao.id === id);
  if (!item) return;

  document.getElementById("descricao").value = item.descricao;
  document.getElementById("valor").value = item.valor;
  document.getElementById("tipo").value = item.tipo;
  editarId = id;
  submitButton.textContent = "Atualizar";
  document.querySelector(".form-inline").scrollIntoView({ behavior: "smooth" });
}

function deletarTransacao(id) {
  transacoes = transacoes.filter(item => item.id !== id);
  salvarTransacoes();
  atualizarTela();
  mostrarMensagem("Transação deletada!", "sucesso");
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function exportarCSV() {
  if (transacoes.length === 0) {
    mostrarMensagem("Nenhuma transação para exportar!", "aviso");
    return;
  }

  let csv = "Data,Descrição,Tipo,Valor\n";
  
  transacoes.forEach((item) => {
    const valor = item.valor.toString().replace(".", ",");
    csv += `${item.data},"${item.descricao}",${item.tipo},${valor}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `gastos_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  mostrarMensagem("Arquivo exportado com sucesso!", "sucesso");
}

function importarCSV(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const csv = event.target.result;
      const linhas = csv.split("\n").filter(linha => linha.trim());
      
      if (linhas.length < 2) {
        mostrarMensagem("Arquivo CSV inválido!", "erro");
        return;
      }

      const novasTransacoes = [];
      for (let i = 1; i < linhas.length; i++) {
        const partes = linhas[i].split(",");
        if (partes.length >= 4) {
          const data = partes[0].trim();
          const descricao = partes[1].trim().replace(/"/g, "");
          const tipo = partes[2].trim();
          const valor = parseFloat(partes[3].trim().replace(",", "."));

          if (data && descricao && (tipo === "entrada" || tipo === "saida") && !isNaN(valor)) {
            novasTransacoes.push({
              id: Date.now() + i,
              data,
              descricao,
              tipo,
              valor
            });
          }
        }
      }

      if (novasTransacoes.length === 0) {
        mostrarMensagem("Nenhuma transação válida foi encontrada!", "erro");
        return;
      }

      transacoes = [...transacoes, ...novasTransacoes];
      salvarTransacoes();
      atualizarTela();
      mostrarMensagem(`${novasTransacoes.length} transacao(oes) importada(s) com sucesso!`, "sucesso");
    } catch (erro) {
      mostrarMensagem("Erro ao importar arquivo!", "erro");
    }
  };
  reader.readAsText(file);
  fileInput.value = "";
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
  mensagem.style.display = "block";
  setTimeout(() => {
    mensagem.style.display = "none";
  }, 3000);
}
