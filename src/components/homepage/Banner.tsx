import Image from "next/image";
import bannerImg from "@/assets/banner.png";
import React from "react";

const Banner = () => {
  return (
    <section className="bg-[#0b0c0e] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center overflow-hidden rounded-2xl border border-zinc-800 bg-[#15171c] lg:grid-cols-2">

        {/* Left Content */}
        <div className="px-6 py-12 sm:px-10 lg:px-12 lg:py-16">

          {/* Eyebrow */}
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#ccff00]">
              WORKOUT LIBRARY
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          {/* CTA */}
          <a
            href="#library"
            className="mt-7 inline-flex items-center gap-3 rounded-md bg-[#ccff00] px-6 py-3 text-sm font-extrabold uppercase text-black transition hover:bg-[#b8e600]"
          >
            <span className="text-lg">↗</span>
            Browse Workouts
          </a>
        </div>

        {/* Right Image */}
        <div className="relative flex min-h-[320px] items-end justify-center px-6 pt-8 lg:min-h-[440px] lg:px-4 lg:pt-0">

          {/* Glow */}
          <div className="absolute right-1/4 top-1/3 h-52 w-52 rounded-full bg-[#ccff00]/10 blur-3xl" />

          <Image
            src={bannerImg}
            alt="Person performing a workout"
            width={600}
            height={500}
            priority
            className="relative z-10 h-auto w-full max-w-md object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;