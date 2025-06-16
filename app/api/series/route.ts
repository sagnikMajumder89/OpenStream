import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id: string = url.searchParams.get("id") || "";
    if (id === "") {
      return new Response(JSON.stringify({ error: "Series ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const seriesId = parseInt(id, 10);

    if (isNaN(seriesId) || seriesId <= 0) {
      return new Response(JSON.stringify({ error: "Invalid Series ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const series = await prisma.series.findUnique({
      where: { id: seriesId },
      include: {
        seasons: {
          orderBy: { seasonNumber: "asc" },
          include: {
            episodes: {
              orderBy: { episodeNumber: "asc" },
            },
          },
        },
      },
    });

    if (!series) {
      return new Response(JSON.stringify({ error: "Series not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(series), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    logger.error("Error in GET /api/series:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
