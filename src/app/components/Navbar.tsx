"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-[#1d1d1d] bg-[#080808] text-white">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-2 px-3 sm:px-5 md:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 sm:gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={34}
            height={34}
            className="h-7 w-7 object-contain sm:h-8 sm:w-8"
            priority
          />

          <span className="text-sm font-extrabold tracking-tight sm:text-lg">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3 md:gap-5">

          <Link
            href="/"
            className={`rounded-full px-3 py-2 text-[10px] font-bold sm:px-4 sm:text-xs ${
              pathname === "/"
                ? "bg-[#d7f51b] text-black"
                : "text-white"
            }`}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-3 py-2 text-[10px] font-bold sm:px-4 sm:text-xs ${
              pathname === "/my-plan"
                ? "bg-[#d7f51b] text-black"
                : "text-white"
            }`}
          >
            MY PLAN
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-6">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1 text-[10px] font-bold sm:gap-2 sm:text-xs"
          >
            <span>Plan</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d7f51b] text-[10px] text-black sm:h-7 sm:w-7">
              {planCount}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1 text-[10px] font-bold sm:gap-2 sm:text-xs"
          >
            <span>Saved</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-600 text-[10px] text-white sm:h-7 sm:w-7">
              {savedCount}
            </span>
          </Link>

        </div>

      </nav>
    </header>
  );
}