import { SeasonEpisode, SeriesData } from "@/lib/interface";
import { Play } from "lucide-react";

interface EpisodeProps {
  series: SeriesData;
  selectedSeasonEpisode: SeasonEpisode;
  setSelectedSeasonEpisode: (seasonEpisode: SeasonEpisode) => void;
}

export default function EpisodeSelector({
  series,
  selectedSeasonEpisode,
  setSelectedSeasonEpisode,
}: EpisodeProps) {
  return (
    <div>
      {series!.seasons[selectedSeasonEpisode!.seasonNumber - 1].episodes.map(
        (episode, index) => (
          <div
            key={index}
            className={`m-2 rounded-2xl p-4 border-b cursor-pointer ${
              selectedSeasonEpisode!.episodeNumber === episode.episodeNumber
                ? "bg-accent"
                : "bg-background"
            }`}
            onClick={() =>
              setSelectedSeasonEpisode({
                seasonNumber: selectedSeasonEpisode!.seasonNumber,
                episodeNumber: episode.episodeNumber,
              })
            }
          >
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-4 h-4" />
              <h2 className="text-lg font-semibold">
                Episode {episode.episodeNumber}: {episode.title}
              </h2>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {episode.description}
            </p>
          </div>
        )
      )}
    </div>
  );
}
