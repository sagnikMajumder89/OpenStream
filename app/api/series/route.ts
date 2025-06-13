import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id: string = url.searchParams.get("id") || "";
  if (id === "") {
    return new Response(JSON.stringify({ error: "Series ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch Series Data from DB
  const seriesData = {
    id,
    title: "Modern Family",
    img: "https://www.peacocktv.com/dam/growth/assets/Library/ModernFamily/modern-family-description-image.jpg",
    description:
      "Three modern-day families from California try to deal with their kids, quirky spouses and jobs in their own unique ways, often falling into hilarious situations.",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            episodeNumber: 1,
            title: "Bringing Up Baby",
            description:
              "Claire and Phil try to prove they're still young by adopting a baby, while Jay and Gloria deal with parenting challenges.",
            videoUrl: "Modern Family Season 4-S04E01",
          },
          {
            episodeNumber: 2,
            title: "Not In My House",
            description:
              "Claire and Phil try to keep their house in order while dealing with the chaos of a new baby.",
            videoUrl: "Modern Family Season 4-S04E02",
          },
          {
            episodeNumber: 3,
            title: "The Butler's Escape",
            description:
              "Jay and Gloria's butler tries to escape from his duties, leading to comedic situations.",
            videoUrl: "Modern Family Season 4-S04E03",
          },
        ],
      },
      {
        seasonNumber: 2,
        episodes: [
          {
            episodeNumber: 1,
            title: "Bringing Up Baby",
            description:
              "Claire and Phil try to prove they're still young by adopting a baby, while Jay and Gloria deal with parenting challenges.",
            videoUrl: "Modern Family Season 4-S04E01",
          },
          {
            episodeNumber: 2,
            title: "Not In My House",
            description:
              "Claire and Phil try to keep their house in order while dealing with the chaos of a new baby.",
            videoUrl: "Modern Family Season 4-S04E02",
          },
          {
            episodeNumber: 3,
            title: "The Butler's Escape",
            description:
              "Jay and Gloria's butler tries to escape from his duties, leading to comedic situations.",
            videoUrl: "Modern Family Season 4-S04E03",
          },
        ],
      },
      {
        seasonNumber: 3,
        episodes: [
          {
            episodeNumber: 1,
            title: "Bringing Up Baby",
            description:
              "Claire and Phil try to prove they're still young by adopting a baby, while Jay and Gloria deal with parenting challenges.",
            videoUrl: "Modern Family Season 4-S04E01",
          },
          {
            episodeNumber: 2,
            title: "Not In My House",
            description:
              "Claire and Phil try to keep their house in order while dealing with the chaos of a new baby.",
            videoUrl: "Modern Family Season 4-S04E02",
          },
          {
            episodeNumber: 3,
            title: "The Butler's Escape",
            description:
              "Jay and Gloria's butler tries to escape from his duties, leading to comedic situations.",
            videoUrl: "Modern Family Season 4-S04E03",
          },
        ],
      },
      {
        seasonNumber: 4,
        episodes: [
          {
            episodeNumber: 1,
            title: "Bringing Up Baby",
            description:
              "Claire and Phil try to prove they're still young by adopting a baby, while Jay and Gloria deal with parenting challenges.",
            videoUrl: "Modern Family Season 4-S04E01",
          },
          {
            episodeNumber: 2,
            title: "Not In My House",
            description:
              "Claire and Phil try to keep their house in order while dealing with the chaos of a new baby.",
            videoUrl: "Modern Family Season 4-S04E02",
          },
          {
            episodeNumber: 3,
            title: "The Butler's Escape",
            description:
              "Jay and Gloria's butler tries to escape from his duties, leading to comedic situations.",
            videoUrl: "Modern Family Season 4-S04E03",
          },
        ],
      },
    ],
  };

  if (!seriesData) {
    return new Response(JSON.stringify({ error: "Series not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(seriesData), {
    headers: { "Content-Type": "application/json" },
  });
}
