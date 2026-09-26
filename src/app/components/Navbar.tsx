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
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#1d1d1d] bg-[#080808] text-white">
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
  className={`rounded-full px-5 py-2 text-xs font-bold ${
    pathname === "/"
      ? "bg-[#d7f51b] text-black"
      : "text-white"
  }`}
>
  WORKOUT
</Link>

<Link
  href="/my-plan"
  className={`rounded-full px-5 py-2 text-xs font-bold ${
    pathname === "/my-plan"
      ? "bg-[#d7f51b] text-black"
      : "text-white"
  }`}
>
  MY PLAN
</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-bold"
          >
            Plan

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d7f51b] text-black">
              {planCount}
            </span>
          </Link>

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