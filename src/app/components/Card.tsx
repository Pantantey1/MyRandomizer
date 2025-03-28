import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReplayIcon from "@mui/icons-material/Replay";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

interface CardProps {
  initialName: string;
  role: string;
  champion: { id: string; name: string; imageUrl: string } | null;
  isLocked: boolean;
  changeIcon: () => void;
  setRole: (newRole: string) => void;
  randomizeChampion: () => void;
}

const roleIcons = [
  "TopIcon.png",
  "JgIcon.png",
  "MidIcon.png",
  "AdcIcon.png",
  "SuppIcon.png",
  "FillIcon.png",
];

const colorCycle = [
  "bg-[#093a63]",
  "bg-[#8e6b92]",//
  "bg-[#012a30]",//
  "bg-[#56000b]",
  "bg-[#2b190d]",
  "bg-[#3a3329]",
  "bg-[#292f47]",
  "bg-[#1c2b24]",
  "bg-[#212121]",
];

export default function Card({
  initialName,
  role,
  champion,
  isLocked,
  changeIcon,
  setRole,
  randomizeChampion,
}: CardProps) {
  const [name, setName] = useState(initialName);

  const [cardColorIndex, setCardColorIndex] = useState(0);
  const [buttonColorIndex, setButtonColorIndex] = useState(1);

  const changeRole = () => {
    if (isLocked) return;

    const currentIndex = roleIcons.indexOf(role);
    const nextIndex = (currentIndex + 1) % roleIcons.length;
    const newRole = roleIcons[nextIndex];

    setRole(newRole);
  };

  const handleFButtonClick = () => {
    setCardColorIndex(buttonColorIndex);
    setButtonColorIndex((prevIndex) => (prevIndex + 1) % colorCycle.length);
  };

  return (
    <div
      className={`relative flex flex-col items-center w-[180px] border border-2 border-[#CBAB70] border-b-[#0a0a0a]  ${colorCycle[cardColorIndex]}`}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-lg font-bold py-3 bg-black text-white w-full text-center"
      />

      <div className="flex flex-col items-center">
        {champion && (
          <>
            <Link href={`/champions/${champion.id}`} target="_blank">
              <Image
                src={champion.imageUrl}
                alt={champion.id}
                width={206}
                height={100}
                className="hover:filter hover:brightness-50 transition-all"
              />
            </Link>
            <div className="flex">
              <h3 className="text-lg font-bold mt-1">
                {champion.name === "Nunu & Willump" ? "Nunu" : champion.name}
              </h3>
              <button
                onClick={randomizeChampion}
                className="absolute end-[0] bg-[#1b6d6b] hover:bg-[#2D7F79] w-8 h-8"
              >
                <ReplayIcon />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="end-[10] top-[11] absolute">
        <button
          onClick={handleFButtonClick}
          className={`border-solid border-2 border-black  w-7 h-7 rounded-full ${colorCycle[buttonColorIndex]}`}
        />
      </div>

      <div className="flex justify-center gap-2 h-[70] items-center mt-1 mb-2">
        <div
          onClick={changeRole}
          className={`cursor-pointer ${isLocked ? "opacity-65" : ""}`}
        >
          <Image
            src={`/icons/${role}`}
            alt="RoleIcon"
            width={45}
            height={45}
            className="hover:opacity-80"
          />
        </div>

        <button onClick={changeIcon} className="cursor-pointer absolute end-[35]">
          {isLocked ? (
            <LockIcon />
          ) : (
            <LockOpenIcon />
          )}
        </button>
      </div>
      <div className="w-0 h-0 border-l-[88px] border-l-transparent border-r-[88px] border-r-transparent border-b-[40px] border-b-[#0a0a0a]"></div>
    </div>
  );
}
