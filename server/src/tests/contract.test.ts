import { describe, expect, it } from "vitest";
import { SERVICE_CATEGORY_SLUGS } from "../constants/serviceCategories";

/**
 * Keeps backend service slugs aligned with the frontend `SERVICE_SLUGS` in client/src/types/service.ts
 */
const FRONTEND_SERVICE_SLUGS = [
  "pvc-works",
  "aluminium-works",
  "kitchen-furniture",
  "decorated-furniture",
] as const;

describe("API contract — service categories", () => {
  it("matches frontend SERVICE_SLUGS", () => {
    expect([...SERVICE_CATEGORY_SLUGS]).toEqual([...FRONTEND_SERVICE_SLUGS]);
  });
});
