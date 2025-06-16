import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { seasonId, episodeNumber, password, title, description, src } =
      await request.json();

    if (!seasonId || !episodeNumber || !password || !title || !src) {
      return new Response("Missing required fields", { status: 400 });
    }

    if (password !== process.env.PASSWORD) {
      return new Response("Unauthorized", { status: 401 });
    }

    const season = await prisma.season.findUnique({
      where: { id: seasonId },
    });

    if (!season) {
      return new Response("Season not found", { status: 404 });
    }

    // create episode
    await prisma.episodes.create({
      data: {
        seasonId: season.id,
        episodeNumber: episodeNumber,
        title: title,
        description: description,
        src: src,
      },
    });

    return new Response(
      JSON.stringify({ message: "Episode added successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    logger.error("Error in add-episode route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
