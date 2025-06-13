"use client";
import { useEffect, useRef, useState } from "react";

interface PlayerProps {
  videoUrl: string; // e.g., "Modern Family Season 4-S04E01"
}

export default function VideoPlayer({ videoUrl }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `/api/video-url?videoUrl=${encodeURIComponent(videoUrl)}`,
          {
            headers: {
              Range: "bytes=0-",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (error) {
        console.error("Video fetch error:", error);
      }
    };

    fetchVideo();

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [videoUrl]);

  return (
    <div>
      <video
        ref={videoRef}
        className="w-full rounded-lg"
        controls
        src={blobUrl || undefined}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
