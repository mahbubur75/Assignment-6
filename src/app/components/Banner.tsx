import Image from "next/image";

const Banner = () => {
  return (
    <section className="bg-[#111111] px-3 py-4 sm:px-4 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden border border-gray-700">
        <div className="grid min-h-112.5 items-center gap-6 px-5 py-8 sm:px-6 md:grid-cols-2 md:gap-8 md:px-12 md:py-10">

          {/* Left Content */}
          <div className="min-w-0">

            <p className="mb-4 text-xs font-bold tracking-wider text-[#ccff00] sm:text-sm">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-gray-400 md:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            <a
              href="#library"
              className="mt-7 inline-block bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#b8eb00] sm:px-6"
            >
              BROWSE WORKOUTS →
            </a>

          </div>

          {/* Right Image */}
          <div className="flex min-w-0 justify-center md:justify-end">
            <Image
              src="/banner.png"
              alt="Workout"
              width={500}
              height={500}
              className="h-auto w-full max-w-70 object-contain sm:max-w-md"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;