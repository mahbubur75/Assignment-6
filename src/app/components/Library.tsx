"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
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

  return (
    <section
      id="library"
      className="bg-[#080808] px-4 py-16 text-white md:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h2 className="text-3xl font-extrabold uppercase md:text-5xl">
              THE LIBRARY
            </h2>

            <p className="mt-3 text-sm text-gray-400 md:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-sm font-bold uppercase text-gray-400"
            >
              Sort By
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="border border-[#333] bg-[#101010] px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-80 items-center justify-center">
            <div className="text-center">

              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#ccff00]" />

              <p className="text-sm font-bold uppercase text-gray-400">
                Loading workouts...
              </p>

            </div>
          </div>
        )}

        {/* Error / Empty */}
        {!loading && workouts.length === 0 && (
          <div className="border border-[#252525] bg-[#101010] p-10 text-center">

            <h3 className="text-2xl font-extrabold uppercase">
              No Workouts Found
            </h3>

            <p className="mt-3 text-gray-400">
              Unable to load workout data.
            </p>

          </div>
        )}

        {/* Workout Cards */}
        {!loading && workouts.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {sortedWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="group overflow-hidden border border-[#252525] bg-[#101010] transition hover:-translate-y-1 hover:border-[#ccff00]"
              >

                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-[#151515]">

                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute right-3 top-3 bg-black/80 px-3 py-1 text-xs font-bold uppercase text-white">
                    {workout.difficulty}
                  </div>

                </div>

                {/* Card Content */}
                <div className="p-5">

                  {/* Category */}
                  <div className="mb-3 flex flex-wrap gap-2">

                    {workout.muscleGroups.map((group) => (
                      <span
                        key={group}
                        className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-extrabold uppercase text-black"
                      >
                        {group}
                      </span>
                    ))}

                  </div>

                  {/* Workout Name */}
                  <h3 className="text-xl font-extrabold uppercase leading-tight transition group-hover:text-[#ccff00]">
                    {workout.name}
                  </h3>

                  {/* Equipment */}
                  <p className="mt-2 text-sm text-gray-400">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-5 grid grid-cols-3 border-t border-[#252525] pt-4">

                    <div>
                      <p className="text-[10px] uppercase text-gray-500">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {workout.duration} min
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-gray-500">
                        Calories
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {workout.caloriesBurned} kcal
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-gray-500">
                        Rating
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        ★ {workout.rating}
                      </p>
                    </div>

                  </div>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}