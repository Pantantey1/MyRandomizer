import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReplayIcon from "@mui/icons-material/Replay";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CreateIcon from "@mui/icons-material/Create";

interface CardProps {
  initialName: string;
  role: string;
  colorCycle: string[];
  numberColor: number;
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

export default function Card({
  initialName,
  role,
  colorCycle,
  numberColor,
  champion,
  isLocked,
  changeIcon,
  setRole,
  randomizeChampion,
}: CardProps) {
  const [name, setName] = useState(initialName);

  const [cardColorIndex, setCardColorIndex] = useState(numberColor);
  const [buttonColorIndex, setButtonColorIndex] = useState(numberColor + 1);

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

  const getChampionNames = (championName: string) => {
    if (championName === "Nunu & Willump") return "Nunu";
    else if (championName === "Renata Glasc") return "Renata";
    else return championName;
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative flex flex-col items-center w-[180px] h-[489] border border-2 border-[#CBAB70] border-b-transparent`}
        style={{ background: colorCycle[cardColorIndex] }}
      >
        <div className="start-[10px] top-[12px] absolute">
          <button
            onClick={handleFButtonClick}
            className={`border-solid border-2 border-black w-7 h-7 rounded-full`}
            style={{ background: colorCycle[buttonColorIndex] }}
          />
        </div>
        <div className="group pointer-events-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-lg font-bold py-3 bg-black text-white w-full text-center outline-none peer z-[3]"
          />
          <CreateIcon className="pointer-events-none end-[14px] top-[14px] absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100 peer-focus:opacity-100 z-[2]" />
        </div>

        <div className="flex flex-col items-center">
          {champion && (
            <Link href={`/champions/${champion.id}`} target="_blank">
              <Image
                src={champion.imageUrl}
                alt={champion.id}
                width={200}
                height={364}
                className="hover:filter hover:brightness-50 transition-all"
              />
            </Link>
          ) }
          {champion && (
            <div className="flex">
              <h3 className="text-lg font-bold mt-1">
                {getChampionNames(champion.name)}
              </h3>
              <button
                onClick={randomizeChampion}
                className="absolute end-[0] bottom-[81.4px] bg-[#1b6d6b] hover:bg-[#2D7F79] w-8 h-8"
              >
                <ReplayIcon />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 h-[70px] items-center mt-1 mb-2">
          <div
            onClick={changeRole}
            className={`cursor-pointer ${isLocked ? "opacity-65" : ""}`}
          >
            <Image
              src={`/${role}`}
              alt="RoleIcon"
              width={45}
              height={45}
              className="hover:opacity-80"
            />
          </div>

          <button
            onClick={changeIcon}
            className="cursor-pointer absolute end-[35px]"
          >
            {isLocked ? <LockIcon /> : <LockOpenIcon />}
          </button>
        </div>
        <div className="h-[43px] w-[180px] border-x-2 border-[#CBAB70] absolute bottom-[-43px]"></div>
        <div className="w-[99px] border-b-2 border-[#CBAB70] bg-black absolute end-[-6px] bottom-[-23.5px] rotate-[0.425rad]"></div>
        <div className="w-[99px] border-b-2 border-[#CBAB70] bg-black absolute start-[-6px] bottom-[-23.5px] rotate-[-0.425rad]"></div>
      </div>
      <div
        style={{
          borderLeftWidth: "88px",
          borderLeftColor: colorCycle[cardColorIndex],
          borderRightWidth: "88px",
          borderRightColor: colorCycle[cardColorIndex],
          borderBottomWidth: "40px",
          borderBottomColor: "transparent",
        }}
        className="w-0 h-0"
      ></div>
    </div>
  );
}
