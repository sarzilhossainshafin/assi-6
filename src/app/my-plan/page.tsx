"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";

const MyPlan = () => {
  const {
    todayPlan,
    savedWorkouts,
    completedWorkouts,
    removeFromPlan,
    removeSavedWorkout,
    markAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"today" | "saved">(
    "today"
  );

  const [sortBy, setSortBy] = useState<
    "duration" | "calories" | "rating"
  >("duration");

  const totalMinutes = todayPlan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = todayPlan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const currentWorkouts = useMemo(() => {
    const workouts =
      activeTab === "today"
        ? [...todayPlan]
        : [...savedWorkouts];

    return workouts.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return b.rating - a.rating;
    });
  }, [activeTab, todayPlan, savedWorkouts, sortBy]);

  return (
    <main className="min-h-screen bg-[#0b0d12] px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-black uppercase md:text-4xl">
            My Plan
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your workout plan and saved exercises.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-gray-800 bg-[#15171d] p-5 sm:grid-cols-3">

          <div className="rounded-xl bg-[#0b0d12] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
              {todayPlan.length}
            </p>
          </div>

          <div className="rounded-xl bg-[#0b0d12] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Total Minutes
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {totalMinutes}

              <span className="ml-1 text-sm font-medium text-gray-500">
                min
              </span>
            </p>
          </div>
          <div className="rounded-xl bg-[#0b0d12] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Total Calories
            </p>
            <p className="mt-2 text-3xl font-black text-white">
              {totalCalories}
              <span className="ml-1 text-sm font-medium text-gray-500">
                kcal
              </span>
            </p>
          </div>
        </div>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">

            <button
              onClick={() => setActiveTab("today")}
              className={`rounded-full px-6 py-3 text-sm font-bold transition ${
                activeTab === "today"
                  ? "bg-[#ccff00] text-black"
                  : "border border-gray-700 text-gray-400 hover:border-[#ccff00] hover:text-[#ccff00]"
              }`}>
              Todays Plan
              <span className="ml-2">
                ({todayPlan.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-full px-6 py-3 text-sm font-bold transition ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black"
                  : "border border-gray-700 text-gray-400 hover:border-[#ccff00] hover:text-[#ccff00]"
              }`}
            >
              Saved
              <span className="ml-2">
                ({savedWorkouts.length})
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-workouts"
              className="text-sm font-semibold text-gray-400"
            > Sort By
            </label>
            <div className="relative">
              <select
                id="sort-workouts"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as
                      | "duration"
                      | "calories"
                      | "rating"
                  )
                }
                className="appearance-none rounded-full border border-gray-700 bg-[#15171d] px-5 py-3 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#ccff00]"
              >
                <option value="duration">
                  Duration
                </option>
                <option value="calories">
                  Calories
                </option>
                <option value="rating">
                  Rating
                </option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                ↓
              </span>
            </div>
          </div>
        </div>
        {activeTab === "today" && (
          <section>
            {todayPlan.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-gray-700 p-10 text-center">
                <h3 className="text-lg font-bold text-white">
                  Your plan is empty
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add some workouts to start building your plan.
                </p>
                <Link
                  href="/"
                  className="mt-5 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#b8e600]"
                >
                  Browse Workouts
                </Link>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {currentWorkouts.map((workout) => {
                  const isDone = completedWorkouts.includes(
                    workout.id
                  );
                  return (
                    <div
                      key={workout.id}
                      className={`overflow-hidden rounded-2xl border bg-[#15171d] transition ${
                        isDone
                          ? "border-[#ccff00]"
                          : "border-gray-800"
                      }`}
                    >
                      <Link
                        href={`/workouts/${workout.id}`}
                      >
                        <Image
                          src={workout.image}
                          alt={workout.name}
                          width={800}
                          height={500}
                          className={`h-52 w-full object-cover transition ${
                            isDone
                              ? "opacity-60"
                              : ""
                          }`}
                        />
                      </Link>

                      <div className="p-5">

                        <div className="mb-3 flex flex-wrap gap-2">
                          {workout.muscleGroups.map(
                            (muscle) => (
                              <span
                                key={muscle}
                                className="rounded-full bg-[#ccff00] px-2 py-1 text-[10px] font-bold uppercase text-black"
                              >
                                {muscle}
                              </span>
                            )
                          )}
                        </div>
                        <Link
                          href={`/workouts/${workout.id}`}
                        >
                          <h3
                            className={`text-xl font-black uppercase hover:text-[#ccff00] ${
                              isDone
                                ? "text-gray-500 line-through"
                                : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h3>
                        </Link>
                        <p className="mt-1 text-xs text-gray-500">
                          {workout.equipment}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-gray-400">
                          <span>
                            ⏱ {workout.duration} min
                          </span>
                          <span>
                            🔥 {workout.caloriesBurned} kcal
                          </span>
                          <span>
                            ★ {workout.rating}
                          </span>
                        </div>
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          <Link
                            href={`/workouts/${workout.id}`}
                            className="rounded-full border border-gray-700 px-4 py-2 text-xs font-bold text-gray-300 transition hover:border-[#ccff00] hover:text-[#ccff00]"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() =>
                              markAsDone(workout.id)
                            }
                            disabled={isDone}
                            className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                              isDone
                                ? "cursor-not-allowed bg-[#ccff00] text-black"
                                : "border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
                            }`}
                          >
                            {isDone
                              ? "✓ Done"
                              : "✓ Mark as Done"}
                          </button>
                          <button
                            onClick={() =>
                              removeFromPlan(workout.id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                            aria-label={`Remove ${workout.name}`}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
        {activeTab === "saved" && (
          <section>
            {savedWorkouts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-700 p-10 text-center">
                <h3 className="text-lg font-bold text-white">
                  No saved workouts
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Save workouts that you want to do later.
                </p>
                <Link
                  href="/"
                  className="mt-5 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#b8e600]"
                >
                  Explore Workouts
                </Link>
              </div>

            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {savedWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="overflow-hidden rounded-2xl border border-gray-800 bg-[#15171d]"
                  >
                    <Link
                      href={`/workouts/${workout.id}`}
                    >
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        width={800}
                        height={500}
                        className="h-52 w-full object-cover"
                      />
                    </Link>

                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {workout.muscleGroups.map(
                          (muscle) => (
                            <span
                              key={muscle}
                              className="rounded-full bg-[#ccff00] px-2 py-1 text-[10px] font-bold uppercase text-black"
                            >
                              {muscle}
                            </span>
                          )
                        )}
                      </div>
                      <Link
                        href={`/workouts/${workout.id}`}
                      >
                        <h3 className="text-xl font-black uppercase text-white hover:text-[#ccff00]">
                          {workout.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">
                        {workout.equipment}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-gray-400">
                        <span>
                          ⏱ {workout.duration} min
                        </span>
                        <span>
                          🔥 {workout.caloriesBurned} kcal
                        </span>
                        <span>
                          ★ {workout.rating}
                        </span>
                      </div>
                      <div className="mt-5 flex items-center gap-2">
                        <Link
                          href={`/workouts/${workout.id}`}
                          className="rounded-full border border-gray-700 px-4 py-2 text-xs font-bold text-gray-300 transition hover:border-[#ccff00] hover:text-[#ccff00]"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() =>
                            removeSavedWorkout(
                              workout.id
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                          aria-label={`Remove ${workout.name}`}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};
export default MyPlan;
