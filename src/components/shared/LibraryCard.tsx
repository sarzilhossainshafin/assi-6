
"use client";

import Image from "next/image";
import Link from "next/link";
import { IData } from "@/types/library.type";

interface ILibraryCardProps {
  workout: IData;
}

const LibraryCard = ({ workout }: ILibraryCardProps) => {
  const handleAddToPlan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const existingPlans: IData[] = JSON.parse(
      localStorage.getItem("todaysPlan") || "[]"
    );

    const alreadyAdded = existingPlans.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      alert("This workout is already in Today's Plan!");
      return;
    }

    const updatedPlans = [...existingPlans, workout];

    localStorage.setItem("todaysPlan", JSON.stringify(updatedPlans));

    alert(`${workout.name} added to Today's Plan!`);
  };

  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group overflow-hidden rounded-xl border border-gray-800 bg-[#15171d]"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2 py-1 text-[10px] font-bold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-black uppercase text-white">
          {workout.name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {workout.equipment}
        </p>

        <div className="my-4 border-t border-gray-800"></div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>

        
      </div>
    </Link>
  );
};

export default LibraryCard;
