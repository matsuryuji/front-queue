export const fetchQueues = async () => {
  const response = await fetch("/filas/desconectadas");
  if (!response.ok) throw new Error("Erro ao buscar filas");
  return response.json();
};
