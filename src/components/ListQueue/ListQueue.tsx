import React from "react";
import { Card } from "@/components/ui/card";
import RowQueue from "../RowQueue/RowQueue";
import type { Queue } from "@/types/Queue";

type Props = {
  connected: Queue[];
  disconnected: Queue[];
};

const ListQueue: React.FC<Props> = ({ connected, disconnected }) => {
  return (
    <div className="space-y-6 mt-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Filas Conectadas</h2>
        {connected.length === 0 ? (
          <p className="text-gray-500">Nenhuma fila conectada.</p>
        ) : (
          <div className="space-y-2">
            {connected.map((queue) => (
              <Card key={queue.id} className="p-4 border rounded">
                <RowQueue queue={queue} />
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Filas Desconectadas</h2>
        {disconnected.length === 0 ? (
          <p className="text-gray-500">Nenhuma fila desconectada.</p>
        ) : (
          <div className="space-y-2">
            {disconnected.map((queue) => (
              <Card key={queue.id} className="p-4 border rounded">
                <RowQueue queue={queue} />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListQueue;
