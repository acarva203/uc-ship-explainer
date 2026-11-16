import { describe, expect, it } from "vitest";
import { filterLinks, trimHistory, CHAT_MAX_TURNS } from "@/lib/ship-chat";
import { SRC } from "@/data/ucship";

describe("ship chat", () => {
  it("keeps official links and strips others", () => {
    const out = filterLinks(`[Plan](${SRC.medical}) and [fake](https://evil.example/x) https://evil.example/y`);
    expect(out).toContain(`[Plan](${SRC.medical})`);
    expect(out).not.toContain("evil.example");
    expect(out).toContain("fake");
  });
  it("limits history to 20 turns starting with a student turn", () => {
    const turns = Array.from({ length: 25 }, (_, i) => ({ role: (i % 2 ? "assistant" : "user") as "user" | "assistant", content: "x".repeat(2000) }));
    const out = trimHistory(turns);
    expect(out.length).toBeLessThanOrEqual(CHAT_MAX_TURNS);
    expect(out[0].role).toBe("user");
    expect(out[0].content.length).toBe(1500);
  });
});
