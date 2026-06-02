# 📊 Controle de Gastos - Planilha Interativa

<div align="center">

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0-blue)

**Uma aplicação web PWA para controlar receitas e despesas de forma simples e intuitiva!**

[🌐 Abrir App](#-como-usar) • [📱 Mobile](#-instalação-no-celular) • [📖 Documentação](#-documentação) • [💬 Issues](../../issues)

</div>

---

## 🎯 Funcionalidades

✅ **Adicionar Transações** - Crie entradas e saídas com descrição e valor  
✅ **Editar Transações** - Modifique dados já registrados  
✅ **Excluir Transações** - Remove registros indesejados  
✅ **Visualizar em Tabela** - Layout tipo planilha com dados organizados  
✅ **Resumo Visual** - Mostra saldo total, entradas e saídas  
✅ **Exportar CSV** - Baixe seus dados em formato Excel/Planilha  
✅ **Importar CSV** - Carregue dados de outras fontes  
✅ **Sincronização Automática** - Dados salvos no navegador (sem servidor)  
✅ **Responsivo** - Funciona em desktop, tablet e celular  

## 🚀 Como Usar

### Opção 1: Abrir Localmente
1. Abra o arquivo `index.html` diretamente no navegador
2. Não precisa de instalação ou conexão com internet
3. Os dados são salvos automaticamente no seu navegador

### Opção 2: Compartilhar com Outros
1. Copie todos os 3 arquivos:
   - `index.html`
   - `style.css`
   - `script.js`
2. Compartilhe em uma pasta compactada (.zip) ou nuvem
3. Outros podem abrir o `index.html` no navegador

### Opção 3: Usar na Web (Servidor Remoto)
Para hospedar online gratuitamente:
- **GitHub Pages**: Envie os arquivos para um repositório GitHub
- **Netlify**: Arraste os arquivos para deploy instantâneo
- **Vercel**: Deploy com um clique

## 📝 Como Adicionar Transações

1. Preencha **Descrição** (ex: "Salário", "Supermercado")
2. Insira o **Valor** (com até 2 casas decimais)
3. Escolha o **Tipo**: Entrada ou Saída
4. Clique em **Adicionar**

## 💾 Exportar e Importar Dados

### Exportar
- Clique em **📥 Exportar CSV**
- Um arquivo será baixado com todos os registros
- Pode abrir em Excel ou Google Sheets

### Importar
- Clique em **📤 Importar CSV**
- Selecione um arquivo CSV válido
- Os dados serão adicionados ao registro existente

### Formato do CSV
```
Data,Descrição,Tipo,Valor
01/06/2024,Salário,entrada,3000,00
05/06/2024,Supermercado,saida,250,50
```

## 🔍 Recursos Avançados

- **Ordenação Automática** - Transações mais recentes aparecem primeiro
- **Colores Indicadores** - Verde para entradas, vermelho para saídas
- **Mensagens de Status** - Confirmação de ações realizadas
- **Responsividade Total** - Adapta-se a qualquer tamanho de tela

## 📱 Compatibilidade

✅ Chrome/Chromium  
✅ Firefox  
✅ Safari  
✅ Edge  
✅ Opera  
✅ Navegadores Mobile  

## 🛡️ Privacidade

- ✅ Sem servidor - tudo funciona localmente
- ✅ Sem cadastro - não precisa de conta
- ✅ Sem internet - funciona offline
- ✅ Seus dados não saem do seu navegador
- ✅ Pode limpar dados a qualquer momento

## ⚠️ Notas Importantes

- Os dados são armazenados no **localStorage** do navegador
- Se limpar o histórico/cache, os dados podem ser perdidos
- **Sempre faça backup** exportando para CSV
- Cada navegador tem seu próprio espaço de dados

## 🆘 Troubleshooting

**Dados sumiram?**
- Verifique se limpou o cache do navegador
- Importe um arquivo CSV anterior se tiver backup

**Arquivo CSV não importa?**
- Certifique-se de que está no formato correto
- Tente criar um teste primeiro exportando e depois importando

**Números aparecem errado?**
- Use ponto (.) para decimais, não vírgula
- Ex: 100.50 ao invés de 100,50

## 💡 Dicas

1. **Backup Semanal** - Exporte seus dados toda semana
2. **Sincronização** - Importe dados de outro dispositivo
3. **Compartilhamento** - Copie o link HTML para amigos usarem
4. **Múltiplas Instâncias** - Cada navegador tem dados separados

## 📄 Licença

Uso livre para fins pessoais e comerciais.

---

**Desenvolvido para facilitar o controle financeiro pessoal** 💚
