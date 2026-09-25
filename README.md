# FitLog — Workout Library

FitLog is a responsive workout library web application built with Next.js and Tailwind CSS.

It allows users to browse workouts, view detailed workout information, create a daily workout plan, save workouts for later, mark workouts as completed, remove workouts, and sort workouts by different criteria.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router
- REST API
- LocalStorage

## Features

1. Browse a workout library with workout cards.
2. View detailed information for each workout.
3. Add workouts to Today's Plan.
4. Save workouts for later.
5. Mark workouts as completed.
6. Remove workouts from the plan or saved list.
7. Sort workouts by duration, calories, or rating.
8. Responsive design for mobile, tablet, and desktop.
9. Live Plan and Saved counters.
10. Loading animation and toast notifications.
11. Custom 404 page for invalid workout routes.
12. Maximum 5 workouts can be added to Today's Plan.

## API

Workout data is loaded from:

https://api.abcz.workers.dev/api/fitlog

Workout details are handled using the workout ID.

## Project Structure

```text
src/
└── app/
    ├── components/
    │   ├── Banner.tsx
    │   ├── Library.tsx
    │   ├── Navbar.tsx
    │   └── workoutActions.tsx
    │
    ├── workout/
    │   └── [id]/
    │       └── page.tsx
    │
    ├── my-plan/
    │   └── page.tsx
    │
    ├── Footer.tsx
    ├── not-found.tsx
    └── page.tsx