export const fetchQueues = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/queue/desconectadas`
  );
  if (!response.ok) throw new Error("Erro ao buscar filas");
  return response.json();
};
