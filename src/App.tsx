import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ListQueue from "@/components/ListQueue/ListQueue";
import type { Queue } from "@/types/Queue";
import FormQueue from "./components/form-queue/FormQueue";
import { fetchQueues } from "./api";

const App = () => {
  const [connected, setConnected] = useState<Queue[]>([]);
  const {
    data: disconnectedQueues = [],
    refetch,
    isLoading,
  } = useQuery<Queue[]>({
    queryKey: ["disconnectedQueues"],
    queryFn: fetchQueues,
    enabled: false,
  });

  const mutation = useMutation({
    mutationFn: async ({ url, apiKey }: { url: string; apiKey: string }) => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/queue/desconectadas`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, apiKey }),
        }
      );

      if (!res.ok) throw new Error("Erro ao consultar filas");
      return res.json();
    },
    onSuccess: (data: { connected: Queue[] }) => {
      setConnected(data.connected);
      refetch();
    },
  });

  const handleSubmit = (url: string, apiKey: string) => {
    mutation.mutate({ url, apiKey });
  };

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <FormQueue onSubmit={handleSubmit} />

      {!isLoading && (
        <ListQueue connected={connected} disconnected={disconnectedQueues} />
      )}
    </main>
  );
};

export default App;
