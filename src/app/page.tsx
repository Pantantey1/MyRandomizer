"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Card from "./components/Card";
import { motion, AnimatePresence } from "framer-motion";
import { Api_Version } from "@/constants";

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

const colorCycle = [
  "#093a63",
  "#8e6b92",
  "#012a30",
  "#56000b",
  "#292f47",
  "#2b190d",
  "#3a3329",
  "#1c2b24",
  "#212121",
];

const namesList = ["El pro", "Juana", "El noob", "Tilt", "Lilith", "Casi AFK", "Queso", "Marcelo", "Gokú", "Lag Mental", "Vikingo", "Hambriento", "Ciego", "Minion", "Flamer", "Conocedor", "Perro"];

const getRandomName = (usedNames : string[]) => {
  const availableNames = namesList.filter((name) => !usedNames.includes(name));
  return availableNames.length > 0
    ? availableNames[Math.floor(Math.random() * availableNames.length)]
    : "Player";
};

const preloadChampionImage = (imageUrl: string) => {
  const img = new Image();
  img.src = imageUrl;
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

  const [cards, setCards] = useState([
    {
      id: 1,
      name: getRandomName([]),
      role: "FillIcon.png",
      champion: {
        id: "Ziggs",
        name: "ZZZiggs",
        imageUrl:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ziggs_24.jpg",
      } as { id: string; name: string; imageUrl: string } | null,
      color: 0,
    },
  ]);
  const [championRoles, setChampionRoles] = useState<ChampionRoles | null>(
    null
  );
  const [lockedRoles, setLockedRoles] = useState<Record<number, boolean>>({});
  const [champions, setChampions] = useState<Champion[]>([]);

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const rolesResponse = await fetch("/data/championData.json");
        const rolesData: ChampionRoles = await rolesResponse.json();
        setChampionRoles(rolesData);

        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${Api_Version}/data/en_US/champion.json`
        );
        const data = await response.json();
        const championsArray = Object.values(data.data) as Champion[];
        setChampions(championsArray);

        championsArray.forEach((champion) => {
          preloadChampionImage(
            `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`
          );
        });
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    };

    fetchChampionData();
  }, []);

  const getRandomChampionByRole = (role: string) => {
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

  const generateRandomForCard = (cardId: number) => {
    const card = cards.find((card) => card.id === cardId);
    if (!card) return;

    const newChampion = getRandomChampionByRole(card.role);
    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === cardId ? { ...c, champion: newChampion } : c
      )
    );
  };

  const generateRandomForAllCards = () => {
    if (!champions || !championRoles) return;

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

        let newChampion = getRandomChampionByRole(newRole);

        while (newChampion && usedChampionIds.has(newChampion.id)) {
          newChampion = getRandomChampionByRole(newRole);
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
  };

  const addCard = () => {
    if (cards.length < 5) {
      const usedNames = cards.map((card) => card.name);
      const newName = getRandomName(usedNames);
      const assignedRoles = new Set(cards.map((card) => card.role));

      const availableRoles = icons.filter(
        (icon) => icon !== "FillIcon.png" && !assignedRoles.has(icon)
      );

      if (availableRoles.length === 0) {
        return;
      }

      const newRole =
        availableRoles[Math.floor(Math.random() * availableRoles.length)];
      const newChampion = getRandomChampionByRole(newRole);

      if (newChampion) {
        preloadChampionImage(newChampion.imageUrl);
      }

      setCards((prevCards) => {
        const newId = prevCards.length + 1;
        return [
          ...prevCards,
          {
            id: newId,
            name: newName,
            role: newRole,
            champion: newChampion,
            color: newId - 1,
          },
        ];
      });

      setLockedRoles((prevState) => ({
        ...prevState,
        [cards.length + 1]: false,
      }));
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
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-cover bg-no-repeat z-[-1]"
        style={{ backgroundImage: "url(/fondo1.png)" }}
      ></div>
      <Header />
      <div className="flex items-center justify-center mt-12">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <div className="flex w-full justify-center gap-2">
            <h2 className="text-xl font-bold">Tarjetas:</h2>
            <div className="flex gap-2 ms-2">
              <button
                onClick={removeCard}
                disabled={cards.length <= 1}
                className="bg-[#a52929] hover:bg-[#af3838] text-white font-bold w-[31px] py-1 rounded disabled:bg-gray-400"
                title="Eliminar tarjeta"
              >
                -
              </button>
              <button
                onClick={addCard}
                disabled={cards.length >= 5}
                className="bg-[#306e89] hover:bg-[#3a7a91] text-white font-bold w-[31px] py-1 rounded disabled:bg-gray-400"
                title="Agregar tarjeta"
              >
                +
              </button>
              <button
                onClick={generateRandomForAllCards}
                className="bg-[#1b6d6b] hover:bg-[#2D7F79] text-white font-bold px-3 py-1 rounded"
                title="Random a todo"
              >
                RANDOM
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatePresence>
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    initialName={card.name}
                    role={card.role}
                    colorCycle={colorCycle}
                    numberColor={card.color}
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
                    randomizeChampion={() => generateRandomForCard(card.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
