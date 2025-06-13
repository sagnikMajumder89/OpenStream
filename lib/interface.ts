export interface TrendingData {
  id: number;
  title: string;
  description: string;
  img: string;
  type: "Series" | "Movie";
}

export interface TrendingResponse {
  series: TrendingData[];
  movies: TrendingData[];
}

interface SeriesEpisode {
  episodeNumber: number;
  title: string;
  description: string;
  videoUrl: string;
}

export interface SeriesSeason {
  seasonNumber: number;
  episodes: SeriesEpisode[];
}

export interface SeriesData {
  id: string;
  title: string;
  img: string;
  description: string;
  seasons: SeriesSeason[];
}

export interface SeasonEpisode {
  seasonNumber: number;
  episodeNumber: number;
}
