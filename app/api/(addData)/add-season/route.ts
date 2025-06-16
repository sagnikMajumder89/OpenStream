import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { seriesId, seasonNumber, password } = body;

    if (!seriesId || !seasonNumber || !password) {
      return new Response("Missing required fields", { status: 400 });
    }

    if (password !== process.env.PASSWORD) {
      return new Response("Unauthorized", { status: 401 });
    }

    const series = await prisma.series.findUnique({
      where: { id: seriesId },
    });

    if (!series) {
      return new Response("Series not found", { status: 404 });
    }

    // create season
    const season = await prisma.season.create({
      data: {
        seriesId: series.id,
        seasonNumber: seasonNumber,
      },
    });

    if (!season) {
      return new Response("Failed to create season", { status: 500 });
    }

    return new Response(
      JSON.stringify({
        message: "Season added successfully",
        seasonId: season.id,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    logger.error("Error in add-season route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
