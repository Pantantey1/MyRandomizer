"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";

interface Story {
  id: number;
  title: string;
  image: string;
  story: string;
}

export default function StoryDetail() {
  const { storiesId } = useParams();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    if (!storiesId) return;

    fetch("/data/storiesData.json")
      .then((response) => response.json())
      .then((data: Story[]) => {
        const selectedStory = data.find(
          (story) => story.id === Number(storiesId)
        );
        setStory(selectedStory || null);
      })
      .catch((error) => console.error("Error loading story:", error));
  }, [storiesId]);

  if (!story) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[#CBAB70] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }  

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-cover bg-no-repeat z-[-1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(/stories.webp)",
        }}
      ></div>
      <Header />
      <div className="max-w-[950px] bg-gray-50 rounded-lg shadow-lg border-2 border-[#CBAB70] my-10 mx-5">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${story.image}`}
          alt={story.title}
          width={1000}
          height={600}
          className="rounded-t-lg"
          unoptimized
        />
        <div className="mx-5 text-center my-5">
          <h1 className="text-4xl font-bold text-black mt-4 font-['Roboto', sans-serif]">
            {story.title}
          </h1>
        </div>
        <div className="mx-5 mb-5 text-justify">
          <p className="text-black mt-4 whitespace-pre-line font-['Open Sans', sans-serif] text-lg leading-relaxed tracking-wide">
            {story.story}
          </p>
        </div>
      </div>
    </div>
  );
}
