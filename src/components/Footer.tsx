export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Aparna J</p>
        <p className="flex items-center gap-2">
          <span className="text-cyan-300">✦</span> Crafted among the stars
        </p>
      </div>
    </footer>
  );
}
