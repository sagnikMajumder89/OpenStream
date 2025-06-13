import { NextRequest } from "next/server";
import { TrendingResponse } from "@/lib/interface";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const type: string = url.searchParams.get("type") || "both";

  const data: TrendingResponse = {
    series: [
      {
        id: 1,
        title: "Modern Family",
        img: "https://www.peacocktv.com/dam/growth/assets/Library/ModernFamily/modern-family-description-image.jpg",
        description:
          "Three modern-day families from California try to deal with their kids, quirky spouses and jobs in their own unique ways, often falling into hilarious situations.",
      },
      {
        id: 2,
        title: "Breaking Bad",
        img: "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_.jpg",
        description:
          "A high school chemistry teacher turned methamphetamine producer.",
      },
    ],
    movies: [
      {
        id: 3,
        title: "Inception",
        img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
        description:
          "A thief who steals corporate secrets through dream-sharing technology.",
      },
      {
        id: 4,
        title: "The Dark Knight",
        img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
        description: "Batman faces the Joker in Gotham City.",
      },
    ],
  };

  if (type === "both") {
    const combinedData = [
      ...data.series.map((item) => ({ ...item, type: "Series" })),
      ...data.movies.map((item) => ({ ...item, type: "Movie" })),
    ];
    return new Response(JSON.stringify(combinedData), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify(data[type as keyof TrendingResponse] || []),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
