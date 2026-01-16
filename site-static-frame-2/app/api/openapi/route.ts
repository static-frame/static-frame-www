import openAPISchema from "./openapi.json";

// GET handler - returns the OpenAPI schema
export async function GET() {
  return new Response(JSON.stringify(openAPISchema, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
