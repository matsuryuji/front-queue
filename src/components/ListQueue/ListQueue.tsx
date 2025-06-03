import React from "react";
import { fetchQueues } from "@/api";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import RowQueue from "../RowQueue/RowQueue";
import type { Queue } from "@/types/Queue";

const ListQueue: React.FC = () => {
  const { data, error, isLoading } = useQuery<Array<Queue>>({
    queryKey: ["queues"],
    queryFn: fetchQueues,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Filas Conectadas</h2>
      <div className="space-y-2">
        {data
          ?.filter((queue) => queue.status === "conectada")
          .map((queue) => (
            <Card key={queue.id} className="p-4 border rounded">
              <RowQueue queue={queue} />
            </Card>
          ))}
      </div>

      <h2 className="text-2xl font-bold">Filas Desconectadas</h2>
      <div className="space-y-2">
        {data
          ?.filter((queue) => queue.status === "desconectada")
          .map((queue) => (
            <Card key={queue.id} className="p-4 border rounded">
              <RowQueue queue={queue} />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ListQueue;
