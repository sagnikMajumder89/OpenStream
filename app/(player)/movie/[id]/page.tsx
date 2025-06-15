"use client";

import VideoPlayer from "@/components/player/player";
import Error from "@/components/ui/error";
import LoadingScreen from "@/components/ui/loading-screen";
import { MovieData } from "@/lib/interface";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Player() {
  const { id } = useParams<{ id: string }>();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movie, setMovie] = useState<MovieData | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get("/api/movie", {
          params: {
            id,
          },
        });
        const data = response.data;
        setMovie(data);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as { error?: string })?.error ||
            "Error fetching movie data"
        );
      } finally {
        setIsFetching(false);
      }
    };
    if (id) {
      fetchMovie();
    } else {
      setError("Movie ID is required");
      setIsFetching(false);
    }
  }, [id]);

  if (isFetching) {
    return <LoadingScreen />;
  }
  if (error) {
    return <Error message={error} button={"home"} />;
  }
  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">{movie!.title}</h1>
        <div className="w-full max-w-3xl mb-4">
          <VideoPlayer src={movie!.src} type="movies" />
        </div>
        <p className="text-gray-700 mb-4">{movie!.description}</p>
      </div>
    </main>
  );
}
