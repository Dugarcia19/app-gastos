# 📁 Estrutura da Aplicação

## Arquivos Principais

```
app-gastos/
├── index.html          # Estrutura HTML
├── style.css           # Estilos (tema escuro)
├── script.js           # Lógica JavaScript
├── README.md           # Documentação completa
├── INSTRUCOES.txt      # Guia em português
├── DEPLOY.md           # Como colocar online
├── netlify.toml        # Config Netlify
└── mkdocs.yml          # Config GitHub Pages
```

---

## Como Funciona

### 1. **HTML (index.html)**
```
<div class="container">
  - Resumo (Saldo, Entradas, Saídas)
  - Formulário (Descrição, Valor, Tipo, Botão)
  - Botões de Ação (Export, Import, Limpar)
  - Tabela de Transações
  - Mensagem de Status
</div>
```

### 2. **CSS (style.css)**
```
- Tema escuro (background: #0f0f0f)
- Cores vibrantes (verde #00ff88, vermelho #ff6b6b)
- Layout responsivo (Grid + Flexbox)
- Tabela estilizada
- Animações suaves
```

### 3. **JavaScript (script.js)**

#### Variáveis Globais:
- `transacoes` = Array com todos os dados
- `editarId` = ID da transação sendo editada
- `STORAGE_KEY` = Chave para localStorage

#### Funções Principais:

| Função | O que faz |
|--------|-----------|
| `carregarTransacoes()` | Lê dados do localStorage |
| `salvarTransacoes()` | Salva dados no localStorage |
| `atualizarTela()` | Renderiza a tabela |
| `iniciarEdicao(id)` | Prepara edição |
| `deletarTransacao(id)` | Remove transação |
| `exportarCSV()` | Baixa arquivo CSV |
| `importarCSV(file)` | Carrega arquivo CSV |
| `mostrarMensagem(texto, tipo)` | Notificação visual |
| `formatCurrency(value)` | Formata para R$ |

---

## Fluxo de Dados

```
[Entrada do Usuário]
        ↓
[Validação]
        ↓
[Salvar em Array]
        ↓
[localStorage.setItem()]
        ↓
[atualizarTela()] → Renderizar HTML
        ↓
[Exibir na Tabela]
```

---

## localStorage (Armazenamento)

### O que é?
- Armazenamento local do navegador
- Persiste entre abas/sessões
- Cada domínio tem ~5-10MB

### Como funciona no código:
```javascript
// Salvar
localStorage.setItem("gastosTransacoes", JSON.stringify(transacoes));

// Carregar
const dados = localStorage.getItem("gastosTransacoes");
transacoes = dados ? JSON.parse(dados) : [];
```

---

## CSV (Import/Export)

### Formato
```
Data,Descrição,Tipo,Valor
01/06/2024,Salário,entrada,5000.00
05/06/2024,Supermercado,saida,250.50
```

### Como funciona:
1. **Export** - Converte array em CSV e baixa
2. **Import** - Lê CSV, valida e adiciona ao array

---

## Responsividade

### Desktop (>768px)
- Tabela completa
- Formulário em linha

### Mobile (<768px)
- Formulário em coluna
- Tabela com scroll horizontal
- Botões em coluna

---

## Cores da App

| Elemento | Cor | Uso |
|----------|-----|-----|
| Fundo | #0f0f0f | Escuro extremo |
| Container | #1a1a1a | Cinza escuro |
| Linhas | #2a2a2a | Cinza médio |
| Entrada | #00ff88 | Verde neon |
| Saída | #ff6b6b | Vermelho |
| Texto | white | Branco |
| Acento | #00ff88 | Verde (títulos) |

---

## Funcionalidades por Tipo

### Banco de Dados (localStorage)
- ✅ Adicionar
- ✅ Ler
- ✅ Editar
- ✅ Deletar

### Interface (HTML/CSS)
- ✅ Tabela responsiva
- ✅ Formulário inline
- ✅ Botões de ação
- ✅ Resumo visual

### Lógica (JavaScript)
- ✅ Validação de entrada
- ✅ Cálculo de saldo
- ✅ Ordenação por data
- ✅ Formatação de moeda
- ✅ Mensagens de status

### Importação/Exportação
- ✅ Download CSV
- ✅ Upload CSV
- ✅ Validação de formato

---

## Eventos Monitorados

```javascript
form.addEventListener("submit", ...)         // Adicionar/Atualizar
exportBtn.addEventListener("click", ...)     // Export
importBtn.addEventListener("click", ...)     // Import (abre diálogo)
fileInput.addEventListener("change", ...)    // Import (processa)
limparBtn.addEventListener("click", ...)     // Limpar tudo
document.addEventListener("click", ...)      // Edit/Delete (delegado)
```

---

## Performance

- **Tamanho**: ~15KB (HTML + CSS + JS)
- **Transações**: Suporta milhares
- **localStorage**: ~5-10MB disponível
- **Velocidade**: Instantânea (tudo local)
- **Sem requisições**: Zero HTTP requests

---

## Compatibilidade

✅ Navegadores modernos (2020+)
✅ localStorage (suportado desde 2008)
✅ localStorage.setItem/getItem/removeItem
✅ JSON.parse/stringify
✅ Array.map, filter, sort
✅ Fetch API (se usar versão cloud)

---

## Como Estender

### Adicionar Categorias:
```javascript
// Adicionar campo select para categoria
// Incluir em cada transação
tipo: "entrada",
categoria: "salário"
```

### Gráficos:
```javascript
// Usar Chart.js ou Google Charts
// Renderizar no novo container
```

### Múltiplos Usuários:
```javascript
// Criar backend (Node.js, Python, etc)
// Sincronizar via API
```

### Sincronização Cloud:
```javascript
// Firebase, Supabase, etc
// Sincronizar automático entre dispositivos
```

---

## Debugação

### Browser DevTools (F12)
- **Console** - Verificar erros
- **Application** - Ver localStorage
- **Network** - Não há requisições (normal)
- **Elements** - Inspecionar HTML

### Dicas:
```javascript
// Ver dados no console
console.log(transacoes);

// Ver localStorage
localStorage.getItem("gastosTransacoes");

// Limpar localStorage (CUIDADO!)
localStorage.clear();
```

---

## Segurança

✅ Sem servidor = sem risco de hack
✅ Sem banco de dados = sem vazamentos
✅ localStorage = Apenas local
✅ Sem senhas = Sem phishing
✅ Código aberto = Auditável

⚠️ localStorage não é 100% seguro (use para dados não-sensíveis)

---

## Limitações Técnicas

- localStorage tem limite (~5-10MB)
- Dados específicos por navegador/domínio
- Sem sincronização automática entre dispositivos
- Sem histórico de sincronização
- Sem permissões por usuário

---

## Próximos Passos

1. **Deploy online** (Netlify/GitHub Pages)
2. **Adicionar ícones** (melhora UX)
3. **Modo dark/light** (toggle tema)
4. **Gráficos** (Chart.js)
5. **Backend** (para múltiplos usuários)
6. **App mobile** (React Native/Flutter)

---

**Desenvolvido com ❤️ em HTML5 + CSS3 + JavaScript ES6+**
