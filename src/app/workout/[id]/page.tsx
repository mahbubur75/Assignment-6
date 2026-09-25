import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import WorkoutActions from "../../components/workoutActions";
import Footer from "@/app/Footer";

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

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const response = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const workout: Workout = await response.json();

    return workout;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#080808] px-4 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold uppercase">
              Workout Not Found
            </h1>

            <p className="mt-4 text-gray-400">
              Workout ID: {id}
            </p>

            <Link
              href="/"
              className="mt-8 inline-block bg-[#ccff00] px-6 py-3 text-sm font-extrabold uppercase text-black"
            >
              Back to Library
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      <section className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/"
            className="mb-8 inline-block text-sm font-bold uppercase text-gray-400 transition hover:text-[#ccff00]"
          >
            ← BACK TO LIBRARY
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">

            {/* Image */}
            <div className="relative aspect-square overflow-hidden border border-[#252525] bg-[#101010]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col">

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {workout.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-extrabold uppercase text-black"
                  >
                    {group}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-extrabold uppercase leading-tight md:text-5xl">
                {workout.name}
              </h1>

              {/* Description */}
              <p className="mt-4 text-sm leading-6 text-gray-400 md:text-base">
                {workout.description}
              </p>

              {/* Stats */}
              <div className="mt-6 border border-[#252525] bg-[#101010]">

                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase text-gray-500">
                    Equipment
                  </span>
                  <span className="text-sm font-bold">
                    {workout.equipment}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase text-gray-500">
                    Difficulty
                  </span>
                  <span className="text-sm font-bold uppercase">
                    {workout.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase text-gray-500">
                    Sets
                  </span>
                  <span className="text-sm font-bold">
                    {workout.sets}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase text-gray-500">
                    Reps
                  </span>
                  <span className="text-sm font-bold">
                    {workout.reps}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase text-gray-500">
                    Duration
                  </span>
                  <span className="text-sm font-bold">
                    {workout.duration} min
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                  <span className="text-[10px] font-bold uppercase text-gray-500">
                    Calories
                  </span>
                  <span className="text-sm font-bold">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-[10px] font-bold uppercase text-gray-500">
                    Rating
                  </span>
                  <span className="text-sm font-bold">
                    ★ {workout.rating}
                  </span>
                </div>

              </div>

              {/* Instructions */}
              <section className="mt-7">

                <h2 className="text-xl font-extrabold uppercase">
                  INSTRUCTIONS
                </h2>

                <div className="mt-4 space-y-3">
                  {workout.instructions.map(
                    (instruction, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >
                        <span className="shrink-0 text-xs font-bold text-[#ccff00]">
                          {index + 1}.
                        </span>

                        <p className="text-xs leading-5 text-gray-400">
                          {instruction}
                        </p>
                      </div>
                    )
                  )}
                </div>

              </section>

              {/* Actions */}
              <WorkoutActions workout={workout} />

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}