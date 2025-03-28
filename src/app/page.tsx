"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Card from "./components/Card";

const icons = [
  "TopIcon.png",
  "JgIcon.png",
  "MidIcon.png",
  "AdcIcon.png",
  "SuppIcon.png",
  "FillIcon.png",
];

const rolesMap: Record<string, string | null> = {
  "TopIcon.png": "Top",
  "JgIcon.png": "Jg",
  "MidIcon.png": "Mid",
  "AdcIcon.png": "Adc",
  "SuppIcon.png": "Supp",
  "FillIcon.png": null,
};

type Champion = {
  id: string;
  name: string;
  image: { full: string };
};

type ChampionRoles = {
  [key: string]: {
    id: string;
    roles: string[];
  };
};

export default function Home() {
  const version = "15.6.1";

  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Player 1",
      role: "FillIcon.png",
      champion: {
        id: "Ziggs",
        name: "ZZZiggs",
        imageUrl:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ziggs_24.jpg",
      } as { id: string; name: string; imageUrl: string } | null,
    },
  ]);
  const [championRoles, setChampionRoles] = useState<ChampionRoles | null>(
    null
  );
  const [lockedRoles, setLockedRoles] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const rolesResponse = await fetch("/data/championData.json");
        const rolesData: ChampionRoles = await rolesResponse.json();
        setChampionRoles(rolesData);
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    };

    fetchChampionData();
  }, []);

  const getRandomChampionByRole = (role: string, champions: Champion[]) => {
    if (!championRoles) return null;
    const selectedRole = rolesMap[role];

    let filteredChampions: Champion[] = [];
    if (selectedRole) {
      filteredChampions = champions.filter((champion) => {
        const champData = championRoles[champion.id];
        return champData && champData.roles.includes(selectedRole);
      });
    } else {
      filteredChampions = champions;
    }

    const newChampion =
      filteredChampions.length > 0
        ? filteredChampions[
            Math.floor(Math.random() * filteredChampions.length)
          ]
        : null;

    return newChampion
      ? {
          id: newChampion.id,
          name: newChampion.name,
          imageUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${newChampion.id}_0.jpg`,
        }
      : null;
  };

  const generateRandomForCard = async (cardId: number) => {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      );
      const data = await response.json();
      const champions = Object.values(data.data) as Champion[];
  
      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.id === cardId) {
            const newChampion = getRandomChampionByRole(card.role, champions);
            return {
              ...card,
              champion: newChampion,
            };
          }
          return card;
        })
      );
    } catch (error) {
      console.error("Error fetching champion data:", error);
    }
  };
  

  const generateRandomForAllCards = async () => {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      );
      const data = await response.json();
      const champions = Object.values(data.data) as Champion[];

      if (!championRoles) return;

      setCards((prevCards) => {
        const lockedRolesSet = new Set(
          prevCards
            .filter((card) => lockedRoles[card.id])
            .map((card) => card.role)
        );

        let availableRoles = icons.filter(
          (role) => role !== "FillIcon.png" && !lockedRolesSet.has(role)
        );

        availableRoles = availableRoles.sort(() => Math.random() - 0.5);

        let roleIndex = 0;
        const usedChampionIds = new Set<string>();

        return prevCards.map((card) => {
          let newRole = card.role;

          if (!lockedRoles[card.id]) {
            newRole = availableRoles[roleIndex] || "FillIcon.png";
            roleIndex++;
          }

          let newChampion = getRandomChampionByRole(newRole, champions);

          while (newChampion && usedChampionIds.has(newChampion.id)) {
            newChampion = getRandomChampionByRole(newRole, champions);
          }

          if (newChampion) {
            usedChampionIds.add(newChampion.id);
          }

          return {
            ...card,
            role: newRole,
            champion: newChampion,
          };
        });
      });
    } catch (error) {
      console.error("Error fetching champion data:", error);
    }
  };

  const addCard = async () => {
    if (cards.length < 5) {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );
        const data = await response.json();
        const champions = Object.values(data.data) as Champion[];

        const assignedRoles = new Set(cards.map((card) => card.role));

        const availableRoles = icons.filter(
          (icon) => icon !== "FillIcon.png" && !assignedRoles.has(icon)
        );

        if (availableRoles.length === 0) {
          console.warn("No hay roles disponibles");
          return;
        }

        const newRole =
          availableRoles[Math.floor(Math.random() * availableRoles.length)];
        const newChampion = getRandomChampionByRole(newRole, champions);

        setCards((prevCards) => {
          const newId = prevCards.length + 1;
          return [
            ...prevCards,
            {
              id: newId,
              name: `Player ${newId}`,
              role: newRole,
              champion: newChampion,
            },
          ];
        });

        setLockedRoles((prevState) => ({
          ...prevState,
          [cards.length + 1]: false,
        }));
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    }
  };

  const removeCard = () => {
    if (cards.length > 1) {
      setCards((prevCards) => prevCards.slice(0, -1));
    }
  };

  const toggleLockRole = (cardId: number) => {
    setLockedRoles((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-cover bg-fixed h-screen w-screen" style={{ backgroundImage: "url(/fondo1.png)" }}>
      <Header />
      <div className="flex items-center justify-center mt-12">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <div className="flex w-full justify-center gap-2">
            <h2 className="text-xl font-bold">Tarjetas:</h2>
            <div className="flex gap-2 ms-2">
              <button
                onClick={removeCard}
                disabled={cards.length <= 1}
                className="bg-[#a52929] hover:bg-[#af3838] text-white font-bold w-[31] py-1 rounded disabled:bg-gray-400"
              >
                -
              </button>
              <button
                onClick={addCard}
                disabled={cards.length >= 5}
                className="bg-[#306e89] hover:bg-[#3a7a91] text-white font-bold w-[31] py-1 rounded disabled:bg-gray-400"
              >
                +
              </button>
              <button
                onClick={generateRandomForAllCards}
                className="bg-[#1b6d6b] hover:bg-[#2D7F79] text-white font-bold px-3 py-1 rounded"
              >
                RANDOM
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {cards.map((card) => (
              <Card
              key={card.id}
              initialName={card.name}
              role={card.role}
              champion={card.champion}
              isLocked={lockedRoles[card.id] || false}
              changeIcon={() => toggleLockRole(card.id)}
              setRole={(newRole) => {
                setCards((prevCards) =>
                  prevCards.map((c) =>
                    c.id === card.id ? { ...c, role: newRole } : c
                  )
                );
              }}
              randomizeChampion={() => generateRandomForCard(card.id)} // Pasar la función
            />            
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
