"use client";

import { useEffect, useState } from "react";
import { IData } from "@/types/library.type";
import LibraryCard from "../shared/LibraryCard";

type SortOption = "duration" | "calories" | "rating";

const Library = () => {
  const [workouts, setWorkouts] = useState<IData[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: IData[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <section
      id="library"
      className="bg-[#0b0d12] px-4 py-16 text-white"
    >
      <div className="mx-auto max-w-7xl">
       
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              Workout Library
            </p>

            <h2 className="text-3xl font-black uppercase md:text-4xl">
              The Library
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

        
          <div className="relative">
            <label
              htmlFor="sort-workouts"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500"
            >
              Sort By
            </label>

            <div className="relative">
              <select
                id="sort-workouts"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="appearance-none rounded-full border border-gray-700 bg-[#15171d] px-5 py-3 pr-12 text-sm font-semibold text-white outline-none transition focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

           
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                ↓
              </span>
            </div>
          </div>
        </div>

        
        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#ccff00]"></div>
          </div>
        ) : sortedWorkouts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-700 p-10 text-center">
            <p className="text-gray-500">
              No workouts found.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <LibraryCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Library;