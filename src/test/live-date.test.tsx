import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useLiveDate } from "@/hooks/use-live-date";
import { deadlineStatus } from "@/lib/ship-math";

afterEach(() => vi.useRealTimers());
describe("Live waiver deadline status", () => {
  it("changes the December 1 deadline to passed exactly at midnight December 2", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 1, 23, 59, 59, 999));
    const { result } = renderHook(useLiveDate);
    expect(deadlineStatus("2026-12-01", result.current ?? new Date(0))).toBe("upcoming");
    act(() => vi.advanceTimersByTime(1));
    expect(deadlineStatus("2026-12-01", result.current ?? new Date(0))).toBe("passed");
  });
  it("refreshes after returning to a tab on a later day", () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date(2026, 11, 1, 12));
    const { result } = renderHook(useLiveDate);
    act(() => { vi.setSystemTime(new Date(2026, 11, 2, 12)); window.dispatchEvent(new Event("focus")); });
    expect(deadlineStatus("2026-12-01", result.current ?? new Date(0))).toBe("passed");
  });
});