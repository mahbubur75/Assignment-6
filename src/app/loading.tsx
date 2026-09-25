export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#333] border-t-[#ccff00]" />

        <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
          Loading FitLog...
        </p>
      </div>
    </main>
  );
}