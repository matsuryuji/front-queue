import React from "react";
import { Button } from "@/components/ui/button";
import type { Queue } from "@/types/Queue";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  queue: Queue;
};

const RowQueue: React.FC<Props> = ({ queue }) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/queue/desconectadas/${id}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) throw new Error("Erro ao marcar como conectada");
      return { id };
    },
    onSuccess: ({ id }) => {
      const previous = queryClient.getQueryData<Queue[]>([
        "disconnectedQueues",
      ]);
      if (!previous) return;

      const updated = previous.map((queue) =>
        queue.id === id
          ? {
              ...queue,
              status: "conectada",
              data_conexao: new Date().toISOString(),
            }
          : queue
      );

      queryClient.setQueryData(["disconnectedQueues"], updated);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/queue/desconectadas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Erro ao deletar fila");
      return { id };
    },
    onSuccess: ({ id }) => {
      const previous = queryClient.getQueryData<Queue[]>([
        "disconnectedQueues",
      ]);
      if (!previous) return;

      const updated = previous.filter((queue) => queue.id !== id);
      queryClient.setQueryData(["disconnectedQueues"], updated);
    },
  });

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-medium text-lg">Nome: {queue.nome_fila}</span>
        <span className="text-sm text-gray-600">
          Instâncias: {queue.instancia}
        </span>
        {queue.status === "conectada" && (
          <span className="text-sm text-gray-600">
            Chat em espera: {queue.chats_em_espera}
          </span>
        )}
        <span className="text-sm text-gray-500">
          {queue.status === "conectada"
            ? `Conectada em ${
                queue.data_conexao
                  ? new Date(queue.data_conexao).toLocaleString()
                  : "—"
              }`
            : `Verificação: ${new Date(
                queue.data_verificacao
              ).toLocaleString()}`}
        </span>
      </div>

      <div className="flex space-x-2">
        {queue.status === "desconectada" && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => updateMutation.mutate(queue.id)}
            >
              Marcar como Conectada
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate(queue.id)}
            >
              Deletar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RowQueue;
