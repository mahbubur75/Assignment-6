"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import { Clock3, Flame, Star } from "lucide-react";
import Navbar from "../components/Navbar";

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
    <main className="min-h-screen overflow-x-hidden bg-[#080808] pt-20 text-white">

      <Navbar />

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">

        {/* Heading */}
        <div>

          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ccff00]">
            YOUR WORKOUTS
          </p>

          <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl md:text-6xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>

        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-3 overflow-hidden border border-[#252d35] bg-[#111820]">

          <div className="border-r border-[#252d35] px-3 py-5 sm:px-6">
            <p className="text-[9px] font-bold uppercase text-gray-500 sm:text-[10px]">
              Exercises
            </p>

            <p className="mt-2 text-2xl font-extrabold text-[#ccff00] sm:text-3xl">
              {currentExercises}
            </p>
          </div>

          <div className="border-r border-[#252d35] px-3 py-5 sm:px-6">
            <p className="text-[9px] font-bold uppercase text-gray-500 sm:text-[10px]">
              Minutes
            </p>

            <p className="mt-2 text-2xl font-extrabold sm:text-3xl">
              {currentMinutes}
            </p>
          </div>

          <div className="px-3 py-5 sm:px-6">
            <p className="text-[9px] font-bold uppercase text-gray-500 sm:text-[10px]">
              Calories
            </p>

            <p className="mt-2 text-2xl font-extrabold sm:text-3xl">
              {currentCalories}
            </p>
          </div>

        </div>

        {/* Tabs + Sort */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex w-full overflow-hidden rounded-lg border border-[#252525] bg-[#111820] sm:w-auto">

            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`flex-1 px-4 py-3 text-[9px] font-extrabold uppercase sm:px-5 sm:text-[10px] ${
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
              className={`flex-1 px-4 py-3 text-[9px] font-extrabold uppercase sm:px-5 sm:text-[10px] ${
                activeTab === "saved"
                  ? "bg-[#26323b] text-white"
                  : "text-gray-500"
              }`}
            >
              Saved
            </button>

          </div>

          <div className="flex items-center justify-end gap-2">

            <label
              htmlFor="sort"
              className="text-[9px] font-bold uppercase text-gray-500 sm:text-[10px]"
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
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
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
                  className={`grid grid-cols-[72px_minmax(0,1fr)] gap-3 px-3 py-4 sm:flex sm:items-center sm:gap-4 sm:px-4 sm:py-3 ${
                    index !== sortedList.length - 1
                      ? "border-b border-[#252525]"
                      : ""
                  }`}
                >

                  {/* Image */}
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-[#1c252c] sm:h-14 sm:w-20">

                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />

                  </div>

                  {/* Workout information */}
                  <div className="min-w-0">

                    <h2 className="text-xs font-extrabold uppercase text-white sm:text-xs">
                      {workout.name}
                    </h2>

                    <p className="mt-1 truncate text-[9px] text-gray-500">
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
                  <div className="col-span-2 grid grid-cols-3 gap-2 border-t border-[#252525] pt-3 sm:flex sm:items-center sm:gap-5 sm:border-0 sm:pt-0">

                    <div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock3 size={12} />
                        <p className="text-[8px] uppercase">
                          Time
                        </p>
                      </div>

                      <p className="mt-1 text-[10px] font-bold text-gray-300">
                        {workout.duration} min
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Flame size={12} />
                        <p className="text-[8px] uppercase">
                          Cal
                        </p>
                      </div>

                      <p className="mt-1 text-[10px] font-bold text-gray-300">
                        {workout.caloriesBurned}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Star size={12} />
                        <p className="text-[8px] uppercase">
                          Rating
                        </p>
                      </div>

                      <p className="mt-1 text-[10px] font-bold text-gray-300">
                        {workout.rating}
                      </p>
                    </div>

                  </div>

                  {/* Mobile Actions */}
                  <div className="col-span-2 flex items-center gap-3 sm:hidden">

                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex-1 border border-[#333] px-3 py-2 text-center text-[9px] font-extrabold uppercase text-gray-400"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        type="button"
                        onClick={() => markDone(workout.id)}
                        disabled={isDone}
                        className={`flex-1 rounded-full px-3 py-2 text-[9px] font-extrabold uppercase ${
                          isDone
                            ? "bg-[#303030] text-gray-500"
                            : "bg-[#ccff00] text-black"
                        }`}
                      >
                        {isDone ? "✓ DONE" : "MARK DONE"}
                      </button>
                    )}

                    {activeTab === "saved" && (
                      <button
                        type="button"
                        onClick={() => removeSaved(workout.id)}
                        className="flex-1 px-3 py-2 text-[9px] font-bold uppercase text-red-400"
                      >
                        Remove
                      </button>
                    )}

                  </div>

                  {/* Desktop View Details */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="hidden whitespace-nowrap text-[9px] font-extrabold uppercase text-gray-400 hover:text-white sm:block"
                  >
                    View Details
                  </Link>

                  {/* Desktop Mark Done */}
                  {activeTab === "today" && (
                    <button
                      type="button"
                      onClick={() => markDone(workout.id)}
                      disabled={isDone}
                      className={`hidden whitespace-nowrap rounded-full px-4 py-2 text-[9px] font-extrabold uppercase sm:block ${
                        isDone
                          ? "bg-[#303030] text-gray-500"
                          : "bg-[#ccff00] text-black"
                      }`}
                    >
                      {isDone ? "✓ DONE" : "MARK AS DONE"}
                    </button>
                  )}

                  {/* Desktop Saved Remove */}
                  {activeTab === "saved" && (
                    <button
                      type="button"
                      onClick={() => removeSaved(workout.id)}
                      className="hidden text-[9px] font-bold uppercase text-red-400 sm:block"
                    >
                      Remove
                    </button>
                  )}

                  {/* Desktop Today Remove */}
                  {activeTab === "today" && (
                    <button
                      type="button"
                      onClick={() => removeWorkout(workout.id)}
                      className="hidden text-[9px] font-bold text-gray-600 hover:text-red-400 sm:block"
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
        <div className="fixed bottom-6 right-4 z-50 max-w-sm border border-[#ccff00] bg-[#101010] px-5 py-4 text-sm font-bold text-[#ccff00] shadow-lg">
          {message}
        </div>
      )}

      <Footer />

    </main>
  );
}