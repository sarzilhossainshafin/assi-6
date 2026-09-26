"use client";

import Image from "next/image";
import { IData } from "@/types/library.type";
import { usePlan } from "@/context/PlanContext";

interface WorkoutDetailsClientProps {
  workout: IData;
}

const WorkoutDetailsClient = ({
  workout,
}: WorkoutDetailsClientProps) => {
  const { addToPlan, saveForLater } = usePlan();

  const handleAddToPlan = () => {
    addToPlan(workout);
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
  };

  return (
    <main className="min-h-screen bg-[#0b0d12] px-4 py-10 text-white">
      <div className="container mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#15171d]">
          <Image
            src={workout.image}
            alt={workout.name}
            width={1000}
            height={800}
            className="h-full min-h-[400px] w-full object-cover"
          />
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h1 className="text-3xl font-black uppercase md:text-5xl">
            {workout.name}
          </h1>

          <p className="mt-4 leading-7 text-gray-400">
            {workout.description}
          </p>

          {/* Muscle Groups */}
          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* KEY SPECS */}
          <div className="mt-8 rounded-xl border border-gray-800 bg-[#15171d] p-5">
            <h2 className="mb-4 text-sm font-black uppercase tracking-wider text-[#ccff00]">
              KEY SPECS
            </h2>

            <div className="divide-y divide-gray-800">
              <SpecRow
                label="Equipment"
                value={String(workout.equipment)}
              />

              <SpecRow
                label="Difficulty"
                value={String(workout.difficulty)}
              />

              <SpecRow
                label="Sets"
                value={String(workout.sets)}
              />

              <SpecRow
                label="Reps"
                value={String(workout.reps)}
              />

              <SpecRow
                label="Duration"
                value={`${workout.duration} min`}
              />

              <SpecRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <SpecRow
                label="Rating"
                value={`★ ${workout.rating}`}
              />
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="mt-8">
            <h2 className="text-xl font-black uppercase">
              INSTRUCTIONS
            </h2>

            <ol className="mt-5 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-black text-black">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-gray-400">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToPlan}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 font-bold text-black transition hover:bg-[#b8e600]"
            >
              ＋ Add to today's plan
            </button>

            <button
              onClick={handleSaveForLater}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-700 px-5 py-3 font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
            >
              ♡ Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ========================= */
/* SPEC ROW */
/* ========================= */

const SpecRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-xs font-bold uppercase text-gray-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
};

export default WorkoutDetailsClient;
