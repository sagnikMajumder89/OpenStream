import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id: string | null = url.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "Movie ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      return new Response(JSON.stringify({ error: "Invalid movie ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const movie = await prisma.movies.findUnique({
      where: { id: idNumber },
      select: {
        id: true,
        title: true,
        src: true,
        description: true,
      },
    });

    if (!movie) {
      return new Response(JSON.stringify({ error: "Movie not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(movie), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    logger.error("Error fetching movie data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch movie data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
