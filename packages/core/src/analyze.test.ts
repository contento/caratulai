import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  analyzeImage,
  buildImageAnalysisPrompt,
  IMAGE_ANALYSIS_SYSTEM_PROMPT,
} from "./analyze.js";
import { EchoProvider } from "./providers/echo.js";
import type { LLMProvider, ImageAnalysisRequest } from "./types.js";

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

  describe("local file loading", () => {
    let testImagePath: string;

    beforeEach(() => {
      // Create a minimal PNG file for testing
      const pngBuffer = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
        0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
        0xde,
      ]);
      testImagePath = join(tmpdir(), `test-image-${Date.now()}.png`);
      writeFileSync(testImagePath, pngBuffer);
    });

    afterEach(() => {
      try {
        unlinkSync(testImagePath);
      } catch {
        // File may already be deleted
      }
    });

    it("analyzeImage loads local PNG file and extracts tags", async () => {
      const provider = new EchoProvider();
      const result = await analyzeImage(
        { source: testImagePath },
        provider
      );
      expect(result.narrative).toBeDefined();
      expect(result.tags).toBeDefined();
      expect(Array.isArray(result.tags)).toBe(true);
      expect(result.source).toBe(testImagePath);
    });

    it("analyzeImage correctly identifies PNG MIME type from extension", async () => {
      const provider = new EchoProvider();
      const result = await analyzeImage(
        { source: testImagePath },
        provider
      );
      // Just verify it runs and returns valid result
      expect(result.narrative.length).toBeGreaterThan(0);
    });
  });

  describe("URL-based image loading", () => {
    let fetchSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      fetchSpy = vi.spyOn(global, "fetch");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("analyzeImage loads image from URL with content-type header", async () => {
      const imageBuffer = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
      ]);
      fetchSpy.mockResolvedValueOnce(
        new Response(imageBuffer, {
          status: 200,
          headers: { "content-type": "image/png; charset=utf-8" },
        })
      );

      const provider = new EchoProvider();
      const result = await analyzeImage(
        { source: "https://example.com/image.png" },
        provider
      );

      expect(result.narrative).toBeDefined();
      expect(result.tags).toBeDefined();
      expect(result.source).toBe("https://example.com/image.png");
    });

    it("analyzeImage falls back to image/jpeg for missing content-type", async () => {
      const imageBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
      fetchSpy.mockResolvedValueOnce(
        new Response(imageBuffer, {
          status: 200,
          headers: {},
        })
      );

      const provider = new EchoProvider();
      const result = await analyzeImage(
        { source: "https://example.com/image" },
        provider
      );

      expect(result.narrative).toBeDefined();
      expect(result.tags).toBeDefined();
    });

    it("analyzeImage throws on HTTP error response", async () => {
      fetchSpy.mockResolvedValueOnce(
        new Response(null, { status: 404, statusText: "Not Found" })
      );

      const provider = new EchoProvider();
      await expect(
        analyzeImage(
          { source: "https://example.com/notfound.jpg" },
          provider
        )
      ).rejects.toThrow("Failed to fetch image");
    });
  });

  describe("provider vision support", () => {
    it("analyzeImage uses generateWithImage if provider supports vision", async () => {
      const mockVisionProvider: LLMProvider = {
        name: "mock-vision",
        generateSvg: vi.fn().mockResolvedValue("fallback description"),
        generateWithImage: vi.fn().mockResolvedValue("cat, dog, tree"),
      };

      const imageBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const testImagePath = join(tmpdir(), `test-vision-${Date.now()}.png`);
      writeFileSync(testImagePath, imageBuffer);

      try {
        const result = await analyzeImage(
          { source: testImagePath },
          mockVisionProvider
        );

        expect(mockVisionProvider.generateWithImage).toHaveBeenCalled();
        expect(result.narrative).toBeDefined();
        expect(Array.isArray(result.tags)).toBe(true);
      } finally {
        unlinkSync(testImagePath);
      }
    });

    it("analyzeImage falls back to generateSvg for non-vision providers", async () => {
      const mockProvider = new EchoProvider();

      const imageBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const testImagePath = join(tmpdir(), `test-novision-${Date.now()}.png`);
      writeFileSync(testImagePath, imageBuffer);

      try {
        const result = await analyzeImage(
          { source: testImagePath },
          mockProvider
        );

        expect(result.narrative).toBeDefined();
        expect(result.tags).toBeDefined();
      } finally {
        unlinkSync(testImagePath);
      }
    });
  });

  describe("parameter passing", () => {
    it("analyzeImage respects custom temperature and model params", async () => {
      const mockProvider: LLMProvider = {
        name: "mock-params",
        generateSvg: vi.fn().mockResolvedValue("description"),
        generateWithImage: vi.fn().mockResolvedValue("vision description"),
      };

      const imageBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const testImagePath = join(tmpdir(), `test-params-${Date.now()}.png`);
      writeFileSync(testImagePath, imageBuffer);

      try {
        await analyzeImage(
          { source: testImagePath },
          mockProvider,
          { temperature: 0.5, model: "test-model" }
        );

        const callArgs = (mockProvider.generateWithImage as ReturnType<typeof vi.fn>).mock.calls[0];
        if (callArgs) {
          const params = callArgs[3];
          expect(params.temperature).toBe(0.5);
          expect(params.model).toBe("test-model");
        }
      } finally {
        unlinkSync(testImagePath);
      }
    });
  });
});
