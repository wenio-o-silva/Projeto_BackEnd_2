export function calculateTotal(preco_diaria, dataEntrada, dataSaida) {
  const entrada = new Date(dataEntrada);
  const saída = new Date(dataSaida);

  const diffMs = saída - entrada;
  const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return preco_diaria * diffDias;
}