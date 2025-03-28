"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import SearchBar from "@/app/components/SearchBar";

interface Champion {
  id: string;
  name: string;
  roles?: string[];
}

export default function Champions() {
  const version = "15.6.1";
  const [champions, setChampions] = useState<Champion[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChampions() {
      try {
        const res = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );
        const localRes = await fetch("/data/championData.json");
        if (!res.ok || !localRes.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        const riotData = await res.json();
        const localData = await localRes.json();

        const championsArray = Object.keys(riotData.data).map((key) => ({
          id: key,
          name: riotData.data[key].name,
          roles: localData[key]?.roles || [],
        }));

        setChampions(championsArray);
        setFilteredChampions(championsArray);
      } catch (error) {
        console.error("Error al obtener los campeones:", error);
      }
    }

    fetchChampions();
  }, []);

  useEffect(() => {
    let results = champions.filter((champ) =>
      champ.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedRole) {
      results = results.filter((champ) => champ.roles?.includes(selectedRole));
    }

    setFilteredChampions(results);
  }, [search, selectedRole, champions]);

  return (
    <div
      className="bg-cover bg-fixed"
      style={{ backgroundImage: "url(/fondo2.png)" }}
    >
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-4 py-5 my-8 mx-4 max-w-5xl min-h-[500px] border-2 border-[#CBAB70] bg-[#0a0a0a]">
          <div className="border-b border-[#CBAB70] pb-2 px-2">
            <SearchBar
              search={search}
              setSearch={setSearch}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4 items-center">
            {filteredChampions.length > 0 ? (
              filteredChampions.map((champ) => (
                <div key={champ.id} className="text-center">
                  <Link href={`/champions/${champ.id}`}>
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
                      alt={`Imagen de ${champ.name}`}
                      width={90}
                      height={90}
                      className="rounded-lg cursor-pointer"
                    />
                  </Link>
                  <p className="mt-2 font-semibold text-sm">
                    {champ.name === "Nunu & Willump" ? "Nunu" : champ.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No se encontraron campeones.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
