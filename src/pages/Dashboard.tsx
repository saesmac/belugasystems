import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ref, onValue } from "firebase/database";
import { database } from "./lib/firebase";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [nivel, setNivel] = useState("-");
  const [distancia, setDistancia] = useState("-");
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState("-");
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const dadosRef = ref(database, "dados");
    onValue(dadosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.entries(data);
        const historicoConvertido = entries.map(([key, value]) => ({
          ...value,
          timestamp: new Date(value.timestamp).toLocaleDateString("pt-BR")
        }));
        const [_, latest] = entries[entries.length - 1];

        setNivel(latest.nivel_caixa ?? "-");
        setDistancia(latest.distancia_cm ?? "-");
        setUltimaAtualizacao(latest.timestamp ?? "-");
        setHistorico(historicoConvertido);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">💧 Beluga Systems</h1>
        <span className="text-gray-500">Dashboard de Monitoramento</span>
      </header>
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="space-y-2">
              <h2 className="font-bold text-lg">Nível da Caixa D'água</h2>
              <p className="text-2xl font-bold">{nivel !== "-" ? `${nivel * 10}L` : "-"}</p>
              <Progress value={nivel} className="h-3" />
              <p className="text-right text-sm text-gray-500">{nivel}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <h2 className="font-bold text-lg">Distância</h2>
              <p className="text-2xl font-bold">{distancia} cm</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <h2 className="font-bold text-lg">Última Atualização</h2>
              <p>{new Date(ultimaAtualizacao).toLocaleString("pt-BR")}</p>
            </CardContent>
          </Card>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Histórico de Nível</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={historico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="nivel_caixa" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Alertas e Notificações</h3>
              <Alert variant="destructive">
                <AlertTitle>Nível baixo detectado</AlertTitle>
                <AlertDescription>A caixa d'água está com menos de 25% da capacidade.</AlertDescription>
              </Alert>
              <Alert className="mt-4">
                <AlertTitle>Sistema funcionando</AlertTitle>
                <AlertDescription>Todos os sensores estão operando normalmente.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="text-center text-xs text-gray-400 p-4">
        © 2025 Beluga Systems - Monitoramento Inteligente de Água
      </footer>
    </div>
  );
};

export default Dashboard;
