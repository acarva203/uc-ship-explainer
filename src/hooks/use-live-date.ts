import { useEffect, useState } from "react";
import { millisecondsUntilNextDay } from "@/lib/ship-math";

export function useLiveDate() {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      const now = new Date();
      setToday(now);
      timer = setTimeout(refresh, millisecondsUntilNextDay(now));
    };
    const visible = () => { if (document.visibilityState === "visible") refresh(); };
    refresh();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", visible);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);
  return today;
}