import { describe, expect, it } from "vitest";
import { getScenario, preferredScenario, scenarioHref } from "@/animations/scenarios";

describe("scenario links", () => {
  it("keeps the library segment on playground routes", () => {
    const fade = getScenario("fade");
    expect(fade && scenarioHref(fade)).toBe("/playground/motion/fade");
  });

  it("omits the library segment on component and advanced routes", () => {
    const dropdown = getScenario("ui-dropdown");
    const path = getScenario("svg-path");
    expect(dropdown && scenarioHref(dropdown)).toBe("/components/ui-dropdown");
    expect(path && scenarioHref(path)).toBe("/advanced/svg-path");
  });

  it("picks a scenario the library can play", () => {
    expect(preferredScenario("auto-animate", "fade")).toBe("list");
    expect(preferredScenario("lottie", "modal")).toBe("fade");
    expect(preferredScenario("lottie", "scroll")).toBe("playback");
    expect(preferredScenario("motion", "fade")).toBe("fade");
  });
});
