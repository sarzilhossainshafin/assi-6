"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const pathname = usePathname();

  const { todayPlan, savedWorkouts } = usePlan();

  const isWorkoutsActive =
    pathname === "/" || pathname.startsWith("/workouts");

  const isMyPlanActive = pathname === "/my-plan";

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0b0c0e]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Fitlog Logo"
            width={40}
            height={40}
          />

          <span className="text-lg font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">

          {/* Workouts */}
          <Link
            href="/"
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              isWorkoutsActive
                ? "bg-[#ccff00] text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              isMyPlanActive
                ? "bg-[#ccff00] text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-5">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-zinc-400"
          >
            <span>Plan</span>

            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ccff00] text-[10px] font-bold text-black">
              {todayPlan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-zinc-400"
          >
            <span>Saved</span>

            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-600 text-[10px] text-zinc-300">
              {savedWorkouts.length}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;