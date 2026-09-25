import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
      <div className="text-center">

        <p className="text-sm font-bold tracking-[0.3em] text-[#ccff00]">
          FITLOG
        </p>

        <h1 className="mt-4 text-7xl font-extrabold">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-extrabold uppercase">
          Workout Not Found
        </h2>

        <p className="mt-3 text-gray-400">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-7 inline-block bg-[#ccff00] px-6 py-3 text-sm font-extrabold uppercase text-black"
        >
          Back to Home
        </Link>

      </div>
    </main>
  );
}