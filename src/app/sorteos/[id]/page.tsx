"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { useParams } from "next/navigation";

interface Sorteo {
  id: number;
  participantes: string;
  ganador: string;
}

export default function SorteoDetail() {
  const { id } = useParams();
  const [sorteo, setSorteo] = useState<Sorteo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/sorteosData.json");
      const data: Sorteo[] = await res.json();
      const found = data.find((s) => s.id === parseInt(id as string));
      setSorteo(found || null);
    };
    fetchData();
  }, [id]);

  if (!sorteo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">404 Sorteo no existente</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center border border-[#CBAB70] p-4">
          <h1 className="text-3xl font-bold mb-4">
            Detalle del Sorteo #{sorteo.id}
          </h1>
          <p className="mb-2">
            <strong>Participantes:</strong> {sorteo.participantes}
          </p>
          <p>
            <strong>Ganador:</strong> {sorteo.ganador}
          </p>
        </div>
      </div>
    </div>
  );
}
