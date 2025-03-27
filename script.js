// seleciona os elementos da lista
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const form = document.querySelector("form");

//seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");

// captura o evento de input para formatar o valor
// oninput dispara sempre que há uma alteração no valor (em tempo real)
amount.oninput = () => {
  // O replace() no JavaScript é usado para substituir partes de uma string por outra. Ele pode funcionar com uma string ou uma expressão regular.
  // fazendo com que o input só aceite numeros e nao letras com regex
  let value = amount.value.replace(/\D/g, "");

  // transformar o valor em centavos
  value = Number(value) / 100;

  // atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

// função para formatar o valor
function formatCurrencyBRL(value) {
  // formata o valor no padrão BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // retorna o valor formatado
  return value;
}

// captura o evento de submit para obter os valores
form.onsubmit = () => {
  // previne o comportamento padrão de recarregar a página
  event.preventDefault();

  // cria um objeto com os detalhes na nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  // passando a função para dentro do form e passando a newExpense para dentro da função para ser criada na li que a expenseAdd criar
  // A função expenseAdd(newExpense); está sendo chamada dentro do evento onsubmit do formulário porque ela é responsável por adicionar a nova despesa à lista na interface assim que o usuário enviar o formulário.
  expenseAdd(newExpense);
};

// adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // criando o elemento de li para adicionar o item na lista
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // criando o icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // adiciona name e category na div das info das dispesa
    expenseInfo.append(expenseName, expenseCategory);

    // criando o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // criando icone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    // adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // adiciona o item na lista
    expenseList.append(expenseItem);

    // limpa os inputs do formulario
    formClearInputs();

    //atualiza os totais
    updateTotals();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
  }
}

// atualiza os totais
function updateTotals() {
  try {
    // recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;

    // atualiza a quantidade de itens na lista
    expenseQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    // variavel para incrementar o total
    let total = 0;

    // percorre cada item (li) da lista (ul)
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      // remove os caracteres não numéricos usando regexp, e usa o replace() para substituir a virgula pelo ponto.
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // converte o valor para float
      value = parseFloat(value);

      // verifica se é um numero valido
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número."
        );
      }

      // incrementa o valor total
      total += Number(value);
    }

    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    // formata o valor e remove o R$ que será exibido pela small com o estilo personalizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    // limpa o conteúdo do elemento
    expenseTotal.innerHTML = "";

    // adiciona o simbolo da moeda e o valor total formatado
    expenseTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possivel atualizar os totais");
  }
}

// evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function (event) {
  // verifica se o elemento clicado é o icone de remover
  if (event.target.classList.contains("remove-icon")) {
    console.log(event);
    // obtem a (li) pai do elemento clicado
    const item = event.target.closest(".expense");

    // remove o item da lista
    item.remove();
  }

  // atualiza os totais
  updateTotals();
});

// limpa os inputs do formulario
function formClearInputs() {
  expense.value = "";
  category.value = "";
  amount.value = "";

  // faz com que o usuario consiga digitar novamente
  expense.focus();
}
