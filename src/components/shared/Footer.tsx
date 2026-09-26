import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-[#0b0d12]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={40}
              height={40}
              className="object-contain"
            />

            <span className="text-lg font-black tracking-widest text-white">
              FIT<span className="text-[#ccff00]">LOG</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-500">
            © 2026 FitLog — Workout Library.{" "}
            <span className="text-gray-400">
              Train hard,{" "}
            </span>
            <span className="font-semibold text-[#ccff00]">
              log honest.
            </span>
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;