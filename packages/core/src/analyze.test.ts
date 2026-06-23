import { describe, it, expect } from "vitest";
import {
  analyzeImage,
  buildImageAnalysisPrompt,
  IMAGE_ANALYSIS_SYSTEM_PROMPT,
} from "./analyze.js";
import { EchoProvider } from "./providers/echo.js";

describe("analyzeImage", () => {
  it("buildImageAnalysisPrompt returns a non-empty string", () => {
    const prompt = buildImageAnalysisPrompt();
    expect(typeof prompt).toBe("string");
    expect(prompt.length).toBeGreaterThan(0);
  });

  it("IMAGE_ANALYSIS_SYSTEM_PROMPT is defined", () => {
    expect(typeof IMAGE_ANALYSIS_SYSTEM_PROMPT).toBe("string");
    expect(IMAGE_ANALYSIS_SYSTEM_PROMPT.length).toBeGreaterThan(0);
  });

  it("analyzeImage throws for non-existent local file", async () => {
    const provider = new EchoProvider();
    await expect(
      analyzeImage(
        { source: "/nonexistent/path/to/image.jpg" },
        provider
      )
    ).rejects.toThrow();
  });

  it("analyzeImage throws for invalid URL", async () => {
    const provider = new EchoProvider();
    await expect(
      analyzeImage(
        { source: "http://invalid.example.com/image.jpg" },
        provider
      )
    ).rejects.toThrow();
  });
});
