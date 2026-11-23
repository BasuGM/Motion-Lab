import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotAFit } from "@/components/animation/not-a-fit";

describe("NotAFit", () => {
  it("explains the mismatch and links to a better demo", () => {
    render(
      <NotAFit
        exclusion={{
          reason: "AutoAnimate does not tween a single box.",
          href: "/playground/auto-animate/list",
          label: "Watch the list transition",
        }}
      />,
    );
    expect(screen.getByText("Not a fit")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Watch the list transition" })).toHaveAttribute(
      "href",
      "/playground/auto-animate/list",
    );
  });
});
