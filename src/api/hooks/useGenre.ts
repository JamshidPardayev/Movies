import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import type { IGenre } from "@/types";

export const useGenre = () => {
  const { data } = useQuery<{ genres: IGenre[] }>({
    queryKey: ["genre"],
    queryFn: () => api.get("genre/movie/list").then((res) => res.data),
  });

  const genres = data?.genres || [];

  return {
    genres,
    genreMap: genres, // optional alias
  };
};
