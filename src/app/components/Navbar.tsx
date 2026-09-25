"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const loadCounts = () => {
      try {
        const plan = JSON.parse(
          localStorage.getItem("fitlog-plan") || "[]"
        );

        const saved = JSON.parse(
          localStorage.getItem("fitlog-saved") || "[]"
        );

        setPlanCount(plan.length);
        setSavedCount(saved.length);
      } catch (error) {
        console.error("Failed to load counters:", error);
      }
    };

    loadCounts();

    window.addEventListener("fitlog-update", loadCounts);

    return () => {
      window.removeEventListener("fitlog-update", loadCounts);
    };
  }, []);

  return (
    <header className="w-full bg-[#080808] text-white">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={34}
            height={34}
            className="h-8 w-8 object-contain"
            priority
          />

          <span className="text-lg font-extrabold tracking-tight">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="rounded-full bg-[#d7f51b] px-5 py-2 text-xs font-bold text-black"
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className="text-xs font-bold text-white"
          >
            MY PLAN
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-bold"
          >
            Plan

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d7f51b] text-black">
              {planCount}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-bold text-white"
          >
            Saved

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-600 text-white">
              {savedCount}
            </span>
          </Link>

        </div>

      </nav>
    </header>
  );
}