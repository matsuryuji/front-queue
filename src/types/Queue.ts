export type Queue = {
  id: number;
  nome_fila: string;
  instancia: string;
  data_verificacao: string;
  status: "conectada" | "desconectada";
  data_conexao?: string;
  chats_em_espera: number;
};

export type QueuesResponse = {
  connected: Queue[];
};
