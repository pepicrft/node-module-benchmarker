import {describe, test, expect, vi} from "vitest";
import {load} from "./load.js"

describe("load", () => {
  test("logs the time it takes to load the module", async () => {
    // Given
    const fallback = vi.fn().mockResolvedValue(undefined)
    const uri = "node:fs"
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation((_) => {})

    // When
    await load(uri, {format: "module"}, fallback)

    // Then
    const log = (consoleLogSpy.mock.calls[0] as any)[0] as string
    const regex = /BENCHMARK_MODULE_LOAD_TIME_START(.+)BENCHMARK_MODULE_LOAD_TIME_END/
    const match = log.match(regex) as any
    expect(match).not.toBeUndefined()
    const payload = JSON.parse(match[1])
    expect(payload.uri).toEqual(uri)
    expect(payload.start).toEqual(expect.any(Number))
    expect(payload.end).toEqual(expect.any(Number))
  })
})
