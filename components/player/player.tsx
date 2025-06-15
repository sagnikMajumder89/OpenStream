"use client";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useEffect, useRef } from "react";
import type Player from "video.js/dist/types/player";

export default function VideoPlayer({
  src,
  type,
}: {
  src: string;
  type: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const newVideoUrl = `/api/stream/${type}${src}/index.m3u8`;
    const newSubtitleUrl = `/api/stream/${type}${src}/subtitles.vtt`;

    if (!playerRef.current) {
      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true,
      });

      playerRef.current.ready(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (playerRef.current as any)?.textTrackSettings.setValues({
          backgroundColor: "black",
          backgroundOpacity: "0",
          edgeStyle: "dropshadow",
          color: "#ffffff",
          fontPercent: 1.0,
          textOpacity: "1",
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (playerRef.current as any)?.textTrackSettings.updateDisplay();
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const remoteTracks = playerRef.current.remoteTextTracks() as any;
      for (let i = remoteTracks.length - 1; i >= 0; i--) {
        playerRef.current.removeRemoteTextTrack(remoteTracks[i]);
      }
    }

    playerRef.current.src({
      src: newVideoUrl,
      type: "application/x-mpegURL",
    });

    playerRef.current.addRemoteTextTrack(
      {
        kind: "subtitles",
        src: newSubtitleUrl,
        srclang: "en",
        label: "English",
        default: true,
      },
      false
    );
  }, [src]);

  return (
    <div data-vjs-player className="w-full mx-auto">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered w-full aspect-video"
        controls
      />
    </div>
  );
}
