import { NextRequest } from "next/server";
import { sigToEx } from "../../../../lib/apiData";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sig } = body;

    if (!sig || typeof sig !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid signature parameter" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const example = sigToEx.get(sig);

    if (!example) {
      return new Response(
        JSON.stringify({
          error: `No example found for signature: ${sig}`,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        signature: sig,
        example: example.join("\n"),
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Get example error:", error);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
