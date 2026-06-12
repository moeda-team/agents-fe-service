export function AuthBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-violet-100 via-violet-50/60 to-background dark:from-violet-950/40 dark:via-background dark:to-background" />
      <div className="absolute -top-6 right-0 size-56 rounded-full bg-linear-to-br from-amber-200/80 to-orange-300/70 blur-3xl dark:from-amber-500/20 dark:to-orange-500/10" />
      <div className="absolute right-8 top-12 size-20 rounded-full bg-linear-to-br from-amber-300 to-orange-400 opacity-90 blur-[2px] dark:opacity-50" />
    </div>
  );
}
