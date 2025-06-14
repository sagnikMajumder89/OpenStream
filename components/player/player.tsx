"use client";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useEffect, useRef } from "react";
import type Player from "video.js/dist/types/player";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const newVideoUrl = `/api/stream${src}/index.m3u8`;
    const newSubtitleUrl = `/api/stream${src}/subtitles.vtt`;

    if (!playerRef.current) {
      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true,
      });

      playerRef.current.ready(() => {
        (playerRef.current as any)?.textTrackSettings.setValues({
          backgroundColor: "black",
          backgroundOpacity: "0",
          edgeStyle: "dropshadow",
          color: "#ffffff",
          fontPercent: 1.0,
          textOpacity: "1",
        });
        (playerRef.current as any)?.textTrackSettings.updateDisplay();
      });
    } else {
      // If reusing player, clear previous remote text tracks
      const remoteTracks = playerRef.current.remoteTextTracks() as any;
      for (let i = remoteTracks.length - 1; i >= 0; i--) {
        playerRef.current.removeRemoteTextTrack(remoteTracks[i]);
      }
    }

    // Set new source
    playerRef.current.src({
      src: newVideoUrl,
      type: "application/x-mpegURL",
    });

    // Re-add subtitle track
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
