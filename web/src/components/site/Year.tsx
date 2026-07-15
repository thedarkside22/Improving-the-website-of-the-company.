"use client";

import { useEffect, useState } from "react";

/** Current year, hydrated on the client so static pages never show a stale year. */
export default function Year() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
