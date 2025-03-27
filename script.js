const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const form = document.querySelector("form");

//seleciona os elementos da lista
const expenseList = document.querySelector("ul");

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
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
  }

  // atualiza os totais
  updateTotals();
}

// atualiza os totais
function updateTotals() {
  try {
    const items = expenseList.children;
  } catch (error) {
    console.log(error);
    alert("Não foi possivel atualizar os totais");
  }
}
