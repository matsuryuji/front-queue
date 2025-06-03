export type Queue = {
  id: number;
  nome_fila: string;
  instancia: string;
  data_verificacao: string;
  status: string;
  data_conexao?: string;
  chats_em_espera: number;
};
