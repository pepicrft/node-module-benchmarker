import { resolve } from "./resolve";
import { describe, test, expect, vi } from "vitest";

describe("resolve", () => {
  test("delegates the resolution to the next resolver", async () => {
    // Given
    const fallback: any = vi.fn();
    const ident = "module-id";
    const context = { conditions: [], parentURL: "" };

    // When
    await resolve(ident, context, fallback);

    // Then
    expect(fallback).toHaveBeenCalledWith(ident, context, fallback);
  });
});
