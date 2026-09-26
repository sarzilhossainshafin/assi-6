import Link from "next/link";
import WorkoutDetailsClient from "./WorkoutDetailsClient";
import { IData } from "@/types/library.type";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const WorkoutDetails = async ({ params }: PageProps) => {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/data.json`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return <p>Failed to load workout.</p>;
  }

  const workouts: IData[] = await response.json();

  const workout = workouts.find((item) => item.id === Number(id));

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