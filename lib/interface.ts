export interface TrendingData {
  id: number;
  title: string;
  description: string;
  img: string;
}

export interface TrendingResponse {
  series: TrendingData[];
  movies: TrendingData[];
}

export interface TrendingItem extends TrendingData {
  type?: "series" | "movie";
}
