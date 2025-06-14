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
            videoUrl: "/modern-family-s4/S04E01",
          },
          {
            episodeNumber: 2,
            title: "Not In My House",
            description:
              "Claire and Phil try to keep their house in order while dealing with the chaos of a new baby.",
            videoUrl: "/modern-family-s4/S04E02",
          },
          {
            episodeNumber: 3,
            title: "The Butler's Escape",
            description:
              "Jay and Gloria's butler tries to escape from his duties, leading to comedic situations.",
            videoUrl: "/modern-family-s4/S04E01",
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
            videoUrl: "/modern-family-s4-S04E01",
          },
          {
            episodeNumber: 2,
            title: "Not In My House",
            description:
              "Claire and Phil try to keep their house in order while dealing with the chaos of a new baby.",
            videoUrl: "/modern-family-s4/S04E01",
          },
          {
            episodeNumber: 3,
            title: "The Butler's Escape",
            description:
              "Jay and Gloria's butler tries to escape from his duties, leading to comedic situations.",
            videoUrl: "/modern-family-s4/S04E01",
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
            videoUrl: "/modern-family-s4/S04E01",
          },
          {
            episodeNumber: 2,
            title: "Not In My House",
            description:
              "Claire and Phil try to keep their house in order while dealing with the chaos of a new baby.",
            videoUrl: "/modern-family-s4/S04E01",
          },
          {
            episodeNumber: 3,
            title: "The Butler's Escape",
            description:
              "Jay and Gloria's butler tries to escape from his duties, leading to comedic situations.",
            videoUrl: "/modern-family-s4/S04E01",
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
            videoUrl: "/modern-family-s4/S04E01",
          },
          {
            episodeNumber: 2,
            title: "Schooled",
            description:
              "Phil tries to bond with Luke over video games, while Claire clashes with Alex over her college plans.",
            videoUrl: "/modern-family-s4/S04E02",
          },
          {
            episodeNumber: 3,
            title: "Snip",
            description:
              "Jay faces pressure to get a vasectomy, while Mitchell and Cam consider becoming parents again.",
            videoUrl: "/modern-family-s4/S04E03",
          },
          {
            episodeNumber: 4,
            title: "The Butler's Escape",
            description:
              "Jay and Gloria's butler tries to escape from his duties, leading to comedic situations.",
            videoUrl: "/modern-family-s4/S04E04",
          },
          {
            episodeNumber: 5,
            title: "Open House of Horrors",
            description:
              "Claire and Phil host a disastrous open house on Halloween while the kids get into mischief.",
            videoUrl: "/modern-family-s4/S04E05",
          },
          {
            episodeNumber: 6,
            title: "Yard Sale",
            description:
              "The families hold a joint yard sale where old secrets resurface and relationships are tested.",
            videoUrl: "/modern-family-s4/S04E06",
          },
          {
            episodeNumber: 7,
            title: "Arrested",
            description:
              "Phil gets arrested for a traffic violation, causing chaos for the entire family.",
            videoUrl: "/modern-family-s4/S04E07",
          },
          {
            episodeNumber: 8,
            title: "Mistery Date",
            description:
              "Claire tries to set up Alex on a date while Phil and Luke deal with an embarrassing situation.",
            videoUrl: "/modern-family-s4/S04E08",
          },
          {
            episodeNumber: 9,
            title: "When a Tree Falls",
            description:
              "A storm traps the family together during a blackout, forcing them to confront unresolved issues.",
            videoUrl: "/modern-family-s4/S04E09",
          },
          {
            episodeNumber: 10,
            title: "Diamond in the Rough",
            description:
              "Gloria tries to modernize Jay's business while Mitchell and Cam plan a fairy tale wedding.",
            videoUrl: "/modern-family-s4/S04E10",
          },
          {
            episodeNumber: 11,
            title: "New Year's Eve",
            description:
              "The family's New Year's Eve celebrations go awry when their separate plans collide.",
            videoUrl: "/modern-family-s4/S04E11",
          },
          {
            episodeNumber: 12,
            title: "Party Crasher",
            description:
              "Phil and Claire try to impress potential clients at a party while the kids sneak into a club.",
            videoUrl: "/modern-family-s4/S04E12",
          },
          {
            episodeNumber: 13,
            title: "Fulgencio",
            description:
              "Gloria's ex-husband visits, causing tension with Jay and revealing family secrets.",
            videoUrl: "/modern-family-s4/S04E13",
          },
          {
            episodeNumber: 14,
            title: "A Slight at the Opera",
            description:
              "Mitchell feels upstaged by Cam's opera career while Phil and Claire deal with neighborhood drama.",
            videoUrl: "/modern-family-s4/S04E14",
          },
          {
            episodeNumber: 15,
            title: "Heart Broken",
            description:
              "Haley deals with her first real heartbreak as the family rallies to support her.",
            videoUrl: "/modern-family-s4/S04E15",
          },
          {
            episodeNumber: 16,
            title: "Bad Hair Day",
            description:
              "Gloria's hair disaster leads to family-wide chaos on an important day for Jay.",
            videoUrl: "/modern-family-s4/S04E16",
          },
          {
            episodeNumber: 17,
            title: "Best Men",
            description:
              "Mitchell and Cameron serve as best men at Pepper's wedding with disastrous results.",
            videoUrl: "/modern-family-s4/S04E17",
          },
          {
            episodeNumber: 18,
            title: "The Wow Factor",
            description:
              "Phil tries to impress a potential client while Claire suspects Alex is hiding something.",
            videoUrl: "/modern-family-s4/S04E18",
          },
          {
            episodeNumber: 19,
            title: "The Future Dunphys",
            description:
              "Claire and Phil glimpse possible futures for their children during a school career day.",
            videoUrl: "/modern-family-s4/S04E19",
          },
          {
            episodeNumber: 20,
            title: "Flip Flop",
            description:
              "The family deals with relationship reversals as Jay becomes dependent on Gloria.",
            videoUrl: "/modern-family-s4/S04E20",
          },
          {
            episodeNumber: 21,
            title: "Career Day",
            description:
              "Parents visit the school for career day, leading to embarrassing moments for the kids.",
            videoUrl: "/modern-family-s4/S04E21",
          },
          {
            episodeNumber: 22,
            title: "My Hero",
            description:
              "Phil becomes a local hero after a minor rescue, while Lily develops an unusual obsession.",
            videoUrl: "/modern-family-s4/S04E22",
          },
          {
            episodeNumber: 23,
            title: "Games People Play",
            description:
              "Family game night reveals hidden rivalries and secret alliances among the relatives.",
            videoUrl: "/modern-family-s4/S04E23",
          },
          {
            episodeNumber: 24,
            title: "Goodnight Gracie",
            description:
              "The family gathers for a memorial service, leading to both touching and chaotic moments.",
            videoUrl: "/modern-family-s4/S04E24",
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
