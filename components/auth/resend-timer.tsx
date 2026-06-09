"use client";

import * as React from "react";

export function ResendTimer({ start = 57 }: { start?: number }) {
  const [sec, setSec] = React.useState(start);

  React.useEffect(() => {
    if (sec <= 0) return;
    const t = setTimeout(() => setSec((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [sec]);

  if (sec <= 0) return <span className="text-primary">Kirim ulang sekarang</span>;

  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return (
    <>
      Kirim ulang dalam {mm}:{ss}
    </>
  );
}
