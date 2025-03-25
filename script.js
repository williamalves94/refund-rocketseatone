const amount = document.getElementById("amount");

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
