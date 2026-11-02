
import Link from "next/link";
import fs from "node:fs/promises";
import path from "node:path";

import WorkoutDetailsClient from "./WorkoutDetailsClient";
import { IData } from "@/types/library.type";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const WorkoutDetails = async ({ params }: PageProps) => {
  const { id } = await params;

  let workouts: IData[];

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data.json"
    );

    const fileContents = await fs.readFile(filePath, "utf-8");

    workouts = JSON.parse(fileContents) as IData[];
  } catch (error) {
    console.error("Failed to load workout data:", error);

    return (
      <main className="min-h-screen bg-[#0b0d12] px-4 py-20 text-center text-white">
        <h1 className="text-3xl font-black">
          FAILED TO LOAD WORKOUT
        </h1>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
        >
          Go to workouts
        </Link>
      </main>
    );
  }

  const workout = workouts.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0b0d12] px-4 py-20 text-center text-white">
        <h1 className="text-3xl font-black">
          WORKOUT NOT FOUND
        </h1>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
        >
          Go to workouts
        </Link>
      </main>
    );
  }

  return <WorkoutDetailsClient workout={workout} />;
};

export default WorkoutDetails;
