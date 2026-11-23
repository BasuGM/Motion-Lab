import { describe, expect, it } from "vitest";
import { missingSnippets } from "@/animations/registry";
import { scenarios, supports } from "@/animations/scenarios";
import { getSnippet } from "@/animations/snippets";

describe("scenario registry", () => {
  it("gives every supported library a snippet", () => {
    expect(missingSnippets()).toEqual([]);
  });

  it("keeps snippets off unsupported pairs", () => {
    for (const scenario of scenarios) {
      for (const library of ["motion", "gsap", "react-spring", "lottie", "auto-animate"] as const) {
        const snippet = getSnippet(scenario.id, library);
        if (supports(scenario, library)) expect(snippet?.code.length).toBeGreaterThan(0);
      }
    }
  });

  it("counts snippet lines from the text", () => {
    const fade = getSnippet("fade", "motion");
    expect(fade?.lines).toBe(fade?.code.split("\n").length);
  });
});
