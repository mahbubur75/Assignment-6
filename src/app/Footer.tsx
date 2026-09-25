import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#252525] bg-[#080808]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={22}
            height={22}
            className="h-5 w-5 object-contain"
          />

          <span className="text-xs font-extrabold text-white">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-[9px] text-gray-500">
          © 2026 FITLOG-Workout Library. Train hard,log honest.
        </p>

      </div>
    </footer>
  );
}