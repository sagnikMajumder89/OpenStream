import { NextRequest, NextResponse } from "next/server";
import { createReadStream, statSync, existsSync } from "fs";
import { join, dirname } from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  // ----- Validate path -----
  const { path } = await params;
  const relativePath = path.join("/");
  const filePath = join(process.cwd(), "contents", relativePath);

  if (!existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  // ----- Check metadata file -----
  const metaPath = join(dirname(filePath), "metadata");
  const isProtected = !existsSync(metaPath);

  // ----- If protected, check token -----
  if (isProtected) {
    const token = req.cookies.get("feedback")?.value;
    if (!token || token !== process.env.NEXT_VIDEO_TOKEN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  // ----- Read file and prepare response -----
  const fileStat = statSync(filePath);
  const range = req.headers.get("range");

  const headers: Record<string, string> = {
    "Content-Type": getMimeType(filePath),
    "Accept-Ranges": "bytes",
  };
  const isVtt = filePath.endsWith(".vtt");
  if (range && !isVtt) {
    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : fileStat.size - 1;

    headers["Content-Range"] = `bytes ${start}-${end}/${fileStat.size}`;
    headers["Content-Length"] = `${end - start + 1}`;
    headers["Content-Type"] = getMimeType(filePath);

    const stream = createReadStream(filePath, { start, end });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(stream as any, {
      status: 206,
      headers,
    });
  }

  headers["Content-Length"] = fileStat.size.toString();
  const stream = createReadStream(filePath);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new NextResponse(stream as any, {
    status: 200,
    headers,
  });
}

function getMimeType(filePath: string): string {
  if (filePath.endsWith(".m3u8")) return "application/vnd.apple.mpegurl";
  if (filePath.endsWith(".ts")) return "video/mp2t";
  if (filePath.endsWith(".vtt")) return "text/vtt; charset=utf-8";
  return "application/octet-stream";
}
