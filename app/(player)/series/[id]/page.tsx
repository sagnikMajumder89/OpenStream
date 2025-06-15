"use client";

import EpisodeSelector from "@/components/player/episode-selector";
import VideoPlayer from "@/components/player/player";
import SeriesSelectorDrawer from "@/components/player/series-selector-drawer";
import Error from "@/components/ui/error";
import LoadingScreen from "@/components/ui/loading-screen";
import { SeasonEpisode, SeriesData } from "@/lib/interface";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Player() {
  const { id } = useParams<{ id: string }>();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [series, setSeries] = useState<SeriesData | null>(null);
  const [selectedSeasonEpisode, setSelectedSeasonEpisode] =
    useState<SeasonEpisode>({ seasonNumber: 1, episodeNumber: 1 });

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get("/api/series", {
          params: {
            id,
          },
        });
        const data = response.data;
        setSeries(data);
        setSelectedSeasonEpisode({ seasonNumber: 1, episodeNumber: 1 });
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as { error?: string })?.error ||
            "Error fetching series data"
        );
      }
      setIsFetching(false);
    };
    if (id) {
      fetchSeries();
    } else {
      setError("Series ID is required");
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
        <h1 className="text-2xl font-bold mb-4">{series!.title}</h1>
        <div className="w-full max-w-3xl mb-4">
          <VideoPlayer
            src={
              series!.seasons[selectedSeasonEpisode.seasonNumber - 1].episodes[
                selectedSeasonEpisode.episodeNumber - 1
              ].videoUrl
            }
            type="series"
          />
        </div>
        <p className="text-gray-700 mb-4">{series!.description}</p>
        {/* Season selector */}
        <SeriesSelectorDrawer
          selected={selectedSeasonEpisode!}
          setSelected={setSelectedSeasonEpisode}
          seasons={series!.seasons}
        />
        {/* Episodes */}
        <EpisodeSelector
          series={series!}
          selectedSeasonEpisode={selectedSeasonEpisode}
          setSelectedSeasonEpisode={setSelectedSeasonEpisode}
        />
      </div>
    </main>
  );
}
