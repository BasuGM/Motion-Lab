import { describe, expect, it } from "vitest";
import { defaultConfig } from "@/types/animation";
import { listSchema, motionSchema } from "@/features/configuration/schemas";

describe("studio schemas", () => {
  it("rejects a Motion stiffness of zero", () => {
    const result = motionSchema.safeParse({ ...defaultConfig, stiffness: 0 });
    expect(result.success).toBe(false);
  });

  it("does not give AutoAnimate a spring field", () => {
    expect("stiffness" in listSchema.shape).toBe(false);
    expect(listSchema.safeParse({ duration: 0.3, ease: "easeOut" }).success).toBe(true);
  });
});
