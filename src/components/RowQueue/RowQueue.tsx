import React from "react";
import { Button } from "@/components/ui/button";
import type { Queue } from "@/types/Queue";

type RowQueueProps = {
  queue: Queue;
};

const RowQueue: React.FC<RowQueueProps> = ({ queue }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-medium text-lg">{queue.nome_fila}</span>
        <span className="text-sm">{queue.instancia}</span>
        <span className="text-sm">
          {queue.status === "conectada"
            ? `Conectada em ${queue.data_conexao}`
            : `Verificação: ${queue.data_verificacao}`}
        </span>
      </div>

      <div className="flex space-x-2">
        {queue.status === "desconectada" && (
          <Button variant="secondary" size="sm">
            Marcar como Conectada
          </Button>
        )}
        <Button variant="destructive" size="sm">
          Deletar
        </Button>
      </div>
    </div>
  );
};

export default RowQueue;
