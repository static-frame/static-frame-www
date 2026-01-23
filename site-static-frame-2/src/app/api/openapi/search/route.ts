import { NextRequest } from "next/server";
import { searchSignatures } from "../../../../lib/search";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, fullSigSearch = false, reSearch = false } = body;

    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid query parameter" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const result = searchSignatures(query, {
      fullSigSearch,
      reSearch,
    });

    return new Response(
      JSON.stringify({
        count: result.count,
        signatures: result.signatures,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Search error:", error);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
