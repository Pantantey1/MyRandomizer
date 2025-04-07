'use client'
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";

interface Sorteo {
    id: number;
    mes: string;
    ganador: string;
}

export default function Sorteos() {
    const [sorteosData, setSorteosData] = useState<Sorteo[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/data/sorteosData.json");
            const data = await res.json();
            setSorteosData(data);
        };
        fetchData();
    }, []);

    const handleClick = (id: number) => {
        router.push(`/sorteos/${id}`);
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center max-w-[1024px] mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4">Sorteos por mes</h1>
                <h3 className=" mb-4">Todas las personas que me ayuden con una donación quedarán participando en el sorteo mensual dependiendo de la cantidad recaudada</h3>
                {sorteosData.map((sorteo) => (
                    <div
                        key={sorteo.id}
                        className="w-full border border-[#CBAB70] p-4 mb-4 rounded shadow bg-gray-200 cursor-pointer text-black hover:bg-[#CBAB70]"
                        onClick={() => handleClick(sorteo.id)}
                    >
                        <p><strong>Mes:</strong> {sorteo.mes}</p>
                        <p><strong>Ganador:</strong> {sorteo.ganador}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
