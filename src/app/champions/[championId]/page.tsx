"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/Header";
import CircularProgress from "@mui/material/CircularProgress";
import { Api_Version } from "@/constants";

interface Ability {
  id: string;
  name: string;
  image: {
    full: string;
  };
}

interface ChampionDetails {
  passive: { image: { full: string }; description: string };
  spells: Ability[];
  lines: string[];
  spellsDescription: { [key: string]: string };
}

export default function ChampionDetails() {
  const { championId } = useParams();
  const [champion, setChampion] = useState<ChampionDetails | null>(null);

  useEffect(() => {
    async function fetchChampionDetails() {
      try {
        const res = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${Api_Version}/data/en_US/champion/${championId}.json`
        );
        const data = await res.json();
        const championDataFromApi = data.data[championId as string];

        const resLocal = await fetch("/data/championData.json");
        const localData = await resLocal.json();

        const championLocalData = localData[championId as string] || {};

        setChampion({
          ...championDataFromApi,
          passive: {
            ...championDataFromApi.passive,
            description: championLocalData.passiveDescription || "",
          },
          spells: championDataFromApi.spells,
          lines: championLocalData.lines || [],
          spellsDescription: championLocalData.spellsDescription || {},
        });
      } catch (error) {
        console.error("Error al obtener detalles del campeón:", error);
      }
    }

    if (championId) fetchChampionDetails();
  }, [championId]);

  if (!champion) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-cover bg-no-repeat z-[-1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(/fondo2.webp)",
        }}
      ></div>

      <Header />
      <div className="flex flex-col items-center">
        <div className="grid max-w-5xl mx-4 mt-12 bg-[#0a0a0a] border-2 border-[#CBAB70]">
          <div className="flex gap-4 m-5 items-center">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${Api_Version}/img/passive/${champion.passive.image.full}`}
              alt="Pasiva"
              width={64}
              height={64}
              className="rounded-lg"
              unoptimized
            />
            <p className="text-sm text-white">
              {champion.passive.description || "Descripción no disponible"}
            </p>
          </div>
          {champion.spells.map((spell, index) => {
            const spellKeys = ["q", "w", "e", "r"];
            const spellKey = `${championId}_${spellKeys[index]}`;

            return (
              <div key={index} className="border-t-2 border-[#916B33]">
                <div className="m-5 flex items-center gap-4">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${Api_Version}/img/spell/${spell.image.full}`}
                    alt={`Habilidad ${index + 1}`}
                    width={64}
                    height={64}
                    className="rounded-lg"
                    unoptimized
                  />
                  <p className="text-sm text-white">
                    {champion.spellsDescription?.[spellKey] ||
                      "Descripción no disponible"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
