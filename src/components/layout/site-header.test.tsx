import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/layout/site-header";

const { setTheme } = vi.hoisted(() => ({ setTheme: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname: () => "/compare/fade",
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "system", setTheme, resolvedTheme: "dark" }),
}));

describe("SiteHeader", () => {
  it("marks the compare route", () => {
    render(<SiteHeader />);
    const link = screen.getByRole("link", { name: "Compare" });
    expect(link).toHaveAttribute("href", "/compare");
    expect(link.className).toContain("underline");
  });

  it("sets the theme to dark", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getAllByRole("radio", { name: "Dark" })[0]);
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
