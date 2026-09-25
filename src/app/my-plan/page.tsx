"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../Footer";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

type Tab = "today" | "saved";

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    function loadData() {
      try {
        const planData = JSON.parse(
          localStorage.getItem("fitlog-plan") || "[]"
        );

        const savedData = JSON.parse(
          localStorage.getItem("fitlog-saved") || "[]"
        );

        const doneData = JSON.parse(
          localStorage.getItem("fitlog-done") || "[]"
        );

        setPlan(planData);
        setSaved(savedData);
        setDoneIds(doneData);
      } catch (error) {
        console.error("Load error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    window.addEventListener("fitlog-update", loadData);

    return () => {
      window.removeEventListener("fitlog-update", loadData);
    };
  }, []);

  function showMessage(text: string) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function markDone(id: number) {
    if (doneIds.includes(id)) {
      return;
    }

    const updatedDone = [...doneIds, id];

    localStorage.setItem(
      "fitlog-done",
      JSON.stringify(updatedDone)
    );

    setDoneIds(updatedDone);

    window.dispatchEvent(new Event("fitlog-update"));

    showMessage("Workout marked as done!");
  }

  function removeWorkout(id: number) {
    const updatedPlan = plan.filter(
      (workout) => workout.id !== id
    );

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setPlan(updatedPlan);

    window.dispatchEvent(new Event("fitlog-update"));

    showMessage("Workout removed from today's plan.");
  }

  function removeSaved(id: number) {
    const updatedSaved = saved.filter(
      (workout) => workout.id !== id
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setSaved(updatedSaved);

    window.dispatchEvent(new Event("fitlog-update"));

    showMessage("Workout removed from saved.");
  }

  const currentList =
    activeTab === "today" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  const currentExercises = currentList.length;

  const currentMinutes = currentList.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const currentCalories = currentList.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#ccff00]" />

          <p className="text-sm font-bold uppercase text-gray-400">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* Navbar */}
      <header className="border-b border-[#1d1d1d] bg-[#080808]">
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="FitLog"
              width={34}
              height={34}
              className="h-8 w-8 object-contain"
              priority
            />

            <span className="text-lg font-extrabold">
              FITLOG
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">

            <Link
              href="/"
              className="text-xs font-bold text-white"
            >
              WORKOUTS
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-5 py-2 text-xs font-extrabold text-black"
            >
              MY PLAN
            </Link>

          </div>

          <div className="flex items-center gap-5">

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-xs font-bold"
            >
              Plan

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ccff00] text-black">
                {plan.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-xs font-bold"
            >
              Saved

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#555] text-white">
                {saved.length}
              </span>
            </Link>

          </div>

        </nav>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">

        <div>

          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ccff00]">
            YOUR WORKOUTS
          </p>

          <h1 className="mt-3 text-5xl font-extrabold uppercase tracking-tight md:text-6xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>

        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-3 overflow-hidden border border-[#252d35] bg-[#111820]">

          <div className="border-r border-[#252d35] px-6 py-5">
            <p className="text-[10px] font-bold uppercase text-gray-500">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-extrabold text-[#ccff00]">
              {currentExercises}
            </p>
          </div>

          <div className="border-r border-[#252d35] px-6 py-5">
            <p className="text-[10px] font-bold uppercase text-gray-500">
              Minutes
            </p>

            <p className="mt-2 text-3xl font-extrabold">
              {currentMinutes}
            </p>
          </div>

          <div className="px-6 py-5">
            <p className="text-[10px] font-bold uppercase text-gray-500">
              Calories
            </p>

            <p className="mt-2 text-3xl font-extrabold">
              {currentCalories}
            </p>
          </div>

        </div>

        {/* Tabs + Sort */}
        <div className="mt-6 flex items-center justify-between">

          <div className="flex overflow-hidden rounded-lg border border-[#252525] bg-[#111820]">

            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`px-5 py-3 text-[10px] font-extrabold uppercase ${
                activeTab === "today"
                  ? "bg-[#26323b] text-white"
                  : "text-gray-500"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-3 text-[10px] font-extrabold uppercase ${
                activeTab === "saved"
                  ? "bg-[#26323b] text-white"
                  : "text-gray-500"
              }`}
            >
              Saved
            </button>

          </div>

          <div className="flex items-center gap-2">

            <label
              htmlFor="sort"
              className="text-[10px] font-bold uppercase text-gray-500"
            >
              Sort By
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              className="border border-[#252525] bg-[#111820] px-3 py-2 text-[10px] font-bold text-white outline-none"
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

          </div>

        </div>

        {/* Empty State */}
        {sortedList.length === 0 && (
          <div className="flex items-center justify-center py-32 text-center">

            <div>

              <h2 className="text-2xl font-extrabold uppercase">
                NOTHING HERE YET
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                {activeTab === "saved"
                  ? "Browse the library and save a workout for later."
                  : "Browse the library and add a lift to get moving."}
              </p>

              <Link
                href="/#library"
                className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-[10px] font-extrabold uppercase text-black"
              >
                Go to Workouts
              </Link>

            </div>

          </div>
        )}

        {/* Workout List */}
        {sortedList.length > 0 && (
          <div className="mt-4 overflow-hidden border border-[#252525] bg-[#10161c]">

            {sortedList.map((workout, index) => {

              const isDone = doneIds.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`flex items-center gap-4 px-4 py-3 ${
                    index !== sortedList.length - 1
                      ? "border-b border-[#252525]"
                      : ""
                  }`}
                >

                  {/* Image */}
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-[#1c252c]">

                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />

                  </div>

                  {/* Workout information */}
                  <div className="min-w-0 flex-1">

                    <h2 className="text-xs font-extrabold uppercase text-white">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-[9px] text-gray-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-1 flex flex-wrap gap-2">

                      {workout.muscleGroups.map((group) => (
                        <span
                          key={group}
                          className="text-[8px] font-bold uppercase text-[#ccff00]"
                        >
                          {group}
                        </span>
                      ))}

                    </div>

                  </div>

                  {/* Stats */}
                  <div className="hidden items-center gap-5 md:flex">

                    <div>
                      <p className="text-[8px] uppercase text-gray-600">
                        Time
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-gray-300">
                        {workout.duration} min
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] uppercase text-gray-600">
                        Cal
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-gray-300">
                        {workout.caloriesBurned}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] uppercase text-gray-600">
                        Rating
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-gray-300">
                        ★ {workout.rating}
                      </p>
                    </div>

                  </div>

                  {/* View Details */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="hidden whitespace-nowrap text-[9px] font-extrabold uppercase text-gray-400 hover:text-white sm:block"
                  >
                    View Details
                  </Link>

                  {/* Mark Done */}
                  {activeTab === "today" && (
                    <button
                      type="button"
                      onClick={() => markDone(workout.id)}
                      disabled={isDone}
                      className={`whitespace-nowrap rounded-full px-4 py-2 text-[9px] font-extrabold uppercase ${
                        isDone
                          ? "bg-[#303030] text-gray-500"
                          : "bg-[#ccff00] text-black"
                      }`}
                    >
                      {isDone ? "✓ DONE" : "MARK AS DONE"}
                    </button>
                  )}

                  {/* Saved Remove */}
                  {activeTab === "saved" && (
                    <button
                      type="button"
                      onClick={() => removeSaved(workout.id)}
                      className="text-[9px] font-bold uppercase text-red-400"
                    >
                      Remove
                    </button>
                  )}

                  {/* Today Remove */}
                  {activeTab === "today" && (
                    <button
                      type="button"
                      onClick={() => removeWorkout(workout.id)}
                      className="text-[9px] font-bold text-gray-600 hover:text-red-400"
                    >
                      ×
                    </button>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </section>

      {/* Toast */}
      {message && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm border border-[#ccff00] bg-[#101010] px-5 py-4 text-sm font-bold text-[#ccff00] shadow-lg">
          {message}
        </div>
      )}

      <Footer />

    </main>
  );
}