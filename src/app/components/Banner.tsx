import Image from "next/image";

const Banner = () => {
  return (
    <section className="bg-[#111111] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden border border-gray-700">
        <div className="grid min-h-112.5 items-center gap-8 px-6 py-10 md:grid-cols-2 md:px-12">

          {/* Left Content */}
          <div>
            <p className="mb-4 text-sm font-bold tracking-wider text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="w-full text-3xl font-extrabold leading-tight text-white md:text-4xl">
  <span className="whitespace-nowrap">
    TRAIN WITH INTENT. LOG
  </span>
  <br />
  EVERY SET.
</h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-gray-400 md:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="mt-7 inline-block bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#b8eb00]"
            >
              BROWSE WORKOUTS →
            </a>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/banner.png"
              alt="Workout"
              width={500}
              height={500}
              className="w-full max-w-md object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;