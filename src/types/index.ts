export interface IMovie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  vote_count: number;
  overview: string;
  original_language: string;
  total_pages: number;
  total_results: number;
  release_date: string;
  runtime: number;
}

export interface IGenre {
  id: number;
  name: string;
}