import { describe, it, expect } from "vitest";
import type { NextRequest } from "next/server";
import { GET } from "./route";
import { POST as searchPOST } from "./search/route";
import { POST as getDocPOST } from "./get_doc/route";
import { POST as getExamplePOST } from "./get_example/route";

describe("OpenAPI Endpoints", () => {
  describe("GET /api/openapi", () => {
    it("should return the OpenAPI schema", async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.openapi).toBe("3.1.0");
      expect(data.info.title).toBe("StaticFrame API");
      expect(data.paths).toBeDefined();
    });
  });

  describe("POST /api/openapi/search", () => {
    it("should search for signatures", async () => {
      const request = new Request("http://localhost/api/openapi/search", {
        method: "POST",
        body: JSON.stringify({ query: "Frame.from_dict" }),
      }) as NextRequest;
      const response = await searchPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.count).toBeGreaterThan(3);
      expect(data.signatures).toBeInstanceOf(Array);
      expect(data.signatures).toContain("Frame.from_dict()");
    });

    it("should return empty results for non-existent query", async () => {
      const request = new Request("http://localhost/api/openapi/search", {
        method: "POST",
        body: JSON.stringify({ query: "NonExistentMethod12345" }),
      }) as NextRequest;
      const response = await searchPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.count).toBe(0);
      expect(data.signatures).toEqual([]);
    });
  });

  describe("POST /api/openapi/get_doc", () => {
    it("should return documentation for a valid signature", async () => {
      const request = new Request("http://localhost/api/openapi/get_doc", {
        method: "POST",
        body: JSON.stringify({ sig: "Frame.from_dict()" }),
      }) as NextRequest;
      const response = await getDocPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.signature).toBe("Frame.from_dict()");
      expect(data.documentation).toContain("dictionary");
    });

    it("should return 404 for non-existent signature", async () => {
      const request = new Request("http://localhost/api/openapi/get_doc", {
        method: "POST",
        body: JSON.stringify({ sig: "NonExistent.method()" }),
      }) as NextRequest;
      const response = await getDocPOST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toContain("No documentation found");
    });
  });

  describe("POST /api/openapi/get_example", () => {
    it("should return example for a valid signature", async () => {
      const request = new Request("http://localhost/api/openapi/get_example", {
        method: "POST",
        body: JSON.stringify({ sig: "Frame.from_dict()" }),
      }) as NextRequest;
      const response = await getExamplePOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.signature).toBe("Frame.from_dict()");
      expect(data.example).toContain("sf.Frame.from_dict");
    });

    it("should return 404 for signature without example", async () => {
      const request = new Request("http://localhost/api/openapi/get_example", {
        method: "POST",
        body: JSON.stringify({ sig: "NonExistent.method()" }),
      }) as NextRequest;
      const response = await getExamplePOST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toContain("No example found");
    });
  });
});
