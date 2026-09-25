"use client";

import { useState } from "react";

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

type WorkoutActionsProps = {
  workout: Workout;
};

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const [message, setMessage] = useState("");

  function showMessage(text: string) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function addToPlan() {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    // Maximum 5 workouts
    if (existingPlan.length >= 5) {
      showMessage("Today's plan is full! Maximum 5 workouts allowed.");
      return;
    }

    const alreadyAdded = existingPlan.some(
      (item: Workout) => item.id === workout.id
    );

    if (alreadyAdded) {
      showMessage("This workout is already in today's plan!");
      return;
    }

    const updatedPlan = [...existingPlan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(new Event("fitlog-update"));

    showMessage(`${workout.name} added to today's plan!`);
  }

  function saveForLater() {
    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    const alreadySaved = existingSaved.some(
      (item: Workout) => item.id === workout.id
    );

    if (alreadySaved) {
      showMessage("This workout is already saved!");
      return;
    }

    const updatedSaved = [...existingSaved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    window.dispatchEvent(new Event("fitlog-update"));

    showMessage(`${workout.name} saved for later!`);
  }

  return (
    <div className="mt-7">
      <div className="flex flex-col gap-3 sm:flex-row">

        {/* Add to Plan */}
        <button
          type="button"
          onClick={addToPlan}
          className="bg-[#ccff00] px-5 py-3 text-xs font-extrabold uppercase text-black transition hover:bg-[#b8eb00]"
        >
          ＋ ADD TO TODAY&apos;S PLAN
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={saveForLater}
          className="border border-[#ccff00] px-5 py-3 text-xs font-extrabold uppercase text-[#ccff00] transition hover:bg-[#ccff00] hover:text-black"
        >
          ♡ SAVE FOR LATER
        </button>

      </div>

      {/* Toast Notification */}
      {message && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm border border-[#ccff00] bg-[#101010] px-5 py-4 text-sm font-bold text-[#ccff00] shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}