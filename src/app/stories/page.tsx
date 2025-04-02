'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";

interface Story {
  id: number;
  title: string;
  image: string;
  story: string;
}

export default function Stories() {
  const [storiesData, setStoriesData] = useState<Story[]>([]);

  useEffect(() => {
    fetch("/data/storiesData.json")
      .then(response => response.json())
      .then((data: Story[]) => {
        setStoriesData(data);
      })
      .catch(error => console.error("Error loading stories:", error));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <h1 className="text-[50px] mt-10">Historias</h1>
      <h1 className="sm:max-w-[450px] md:max-w-[630px] lg:max-w-[950px] m-6">
        Este es un espacio en el que colocaré historias sobre los distintos campeones de League of Legends.
        Cada espacio pertenecerá a un campeón y una temática de este.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {storiesData.length > 0 ? (
          storiesData.map(story => (
            <Link key={story.id} href={`/stories/${story.id}`}>
              <div className="cursor-pointer flex flex-col items-center max-w-[350px] bg-gray-100 rounded-t-lg shadow-lg border-2 border-[#CBAB70] bg-[#093a63]">
                <Image 
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${story.image}`}
                  alt={story.title} 
                  width={300} 
                  height={177} 
                  className="rounded-t-lg"
                />
                <h2 className="text-lg font-bold my-2 text-white">{story.title}</h2>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white mt-4">Cargando historias...</p>
        )}
      </div>
    </div>
  );
}
