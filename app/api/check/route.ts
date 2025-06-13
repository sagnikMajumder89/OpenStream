import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const token = request.cookies.get("feedback")?.value;
  if (!token || token !== process.env.NEXT_VIDEO_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Token is valid" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
