import { NextRequest, NextResponse } from "next/server";
import { stat, open } from "fs/promises";
import path from "path";

const TRACKS: Record<string, string> = {
  retro1: "retro1.mp3",
  retro2: "retro2.mp3",
  retro3: "retro3.mp3",
  retro4: "retro4.mp3",
};

const AUDIO_DIR = path.join(process.cwd(), "audio");

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id || !TRACKS[id]) {
    return NextResponse.json({ error: "Invalid track id" }, { status: 400 });
  }

  const filePath = path.join(AUDIO_DIR, TRACKS[id]);

  let fileStats;
  try {
    fileStats = await stat(filePath);
  } catch {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  const fileSize = fileStats.size;
  const rangeHeader = request.headers.get("range");

  if (rangeHeader) {
    const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (!match) {
      return new NextResponse("Invalid range", { status: 416 });
    }

    const start = parseInt(match[1], 10);
    const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize || start > end) {
      return new NextResponse("Range not satisfiable", {
        status: 416,
        headers: { "Content-Range": `bytes */${fileSize}` },
      });
    }

    const chunkSize = end - start + 1;
    const fileHandle = await open(filePath, "r");
    const stream = fileHandle.createReadStream({ start, end, autoClose: true });

    const readable = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
      cancel() {
        stream.destroy();
      },
    });

    return new NextResponse(readable, {
      status: 206,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(chunkSize),
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Disposition": "inline",
        "Cache-Control": "no-store",
      },
    });
  }

  // Full file response
  const fileHandle = await open(filePath, "r");
  const stream = fileHandle.createReadStream({ autoClose: true });

  const readable = new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => controller.enqueue(chunk));
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
    cancel() {
      stream.destroy();
    },
  });

  return new NextResponse(readable, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": String(fileSize),
      "Accept-Ranges": "bytes",
      "Content-Disposition": "inline",
      "Cache-Control": "no-store",
    },
  });
}
