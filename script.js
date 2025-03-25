const amount = document.getElementById("amount");

// oninput dispara sempre que há uma alteração no valor (em tempo real)
amount.oninput = () => {
  // O replace() no JavaScript é usado para substituir partes de uma string por outra. Ele pode funcionar com uma string ou uma expressão regular.
  // fazendo com que o input só aceite numeros e nao letras com regex
  let value = amount.value.replace(/\D/g, "");

  amount.value = value;
};
