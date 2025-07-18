export interface TrendingData {
  id: number;
  title: string;
  description: string;
  img: string;
  type: "SERIES" | "MOVIE";
}

export interface TrendingResponse {
  series: TrendingData[];
  movies: TrendingData[];
}

interface SeriesEpisode {
  episodeNumber: number;
  title: string;
  description: string;
  src: string;
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

export interface MovieData {
  id: string;
  title: string;
  img: string;
  description: string;
  src: string;
}
