import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const videoUrl: string = url.searchParams.get("videoUrl") || "";
    const token = request.cookies.get("feedback")?.value;

    if (token !== process.env.NEXT_VIDEO_TOKEN) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!videoUrl) {
      return new Response(JSON.stringify({ error: "Video URL is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const fileName = videoUrl.split("-");

    const series = fileName[0];
    const episode = fileName[1];

    console.log("Series:", series);
    console.log("Episode:", episode);

    if (!series || !episode) {
      return new Response("Missing parameters", { status: 400 });
    }

    const filePath = path.join(
      process.cwd(),
      "protected-videos",
      series,
      `${episode}.mkv`
    );
    if (!fs.existsSync(filePath)) {
      return new Response("File not found", { status: 404 });
    }
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    const range = request.headers.get("range");
    if (!range) {
      return new Response("Range header required", { status: 416 });
    }

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength.toString(),
      "Content-Type": "video/x-matroska", // for .mkv files
    };

    const videoStream = fs.createReadStream(filePath, { start, end });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Response(videoStream as any, { status: 206, headers });
  } catch (error) {
    console.error("Error in video-url route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
