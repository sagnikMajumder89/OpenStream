import { NextRequest } from "next/server";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const type: string = url.searchParams.get("type") || "both";

  // const data: TrendingResponse = {
  //   series: [
  //     {
  //       id: 1,
  //       title: "Modern Family",
  //       img: "https://www.peacocktv.com/dam/growth/assets/Library/ModernFamily/modern-family-description-image.jpg",
  //       type: "Series",
  //       description:
  //         "Three modern-day families from California try to deal with their kids, quirky spouses and jobs in their own unique ways, often falling into hilarious situations.",
  //     },
  //     {
  //       id: 2,
  //       title: "Breaking Bad",
  //       img: "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_.jpg",
  //       type: "Series",
  //       description:
  //         "A high school chemistry teacher turned methamphetamine producer.",
  //     },
  //   ],
  //   movies: [
  //     {
  //       id: 3,
  //       title: "Inception",
  //       img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
  //       type: "Movie",
  //       description:
  //         "A thief who steals corporate secrets through dream-sharing technology.",
  //     },
  //     {
  //       id: 4,
  //       title: "The Dark Knight",
  //       img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
  //       type: "Movie",
  //       description: "Batman faces the Joker in Gotham City.",
  //     },
  //   ],
  // };

  if (type === "both") {
    try {
      const movies = await prisma.movies.findMany({
        take: 10,
        select: {
          id: true,
          title: true,
          img: true,
          type: true,
          description: true,
        },
      });
      const series = await prisma.series.findMany({
        take: 10,
        select: {
          id: true,
          title: true,
          img: true,
          type: true,
          description: true,
        },
      });

      const data = [...series, ...movies];
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      logger.error("Error fetching trending data:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch trending data" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else if (type === "movies") {
    const movies = await prisma.movies.findMany({
      take: 10,
      select: {
        id: true,
        title: true,
        img: true,
        type: true,
        description: true,
      },
    });

    return new Response(JSON.stringify(movies), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    const series = await prisma.series.findMany({
      take: 10,
      select: {
        id: true,
        title: true,
        img: true,
        type: true,
        description: true,
      },
    });

    return new Response(JSON.stringify(series), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
