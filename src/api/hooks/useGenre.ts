import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import type { IGenre } from "@/types"; // ✅ type-only

export const useGenre = () => {
  const { data } = useQuery({
    queryKey: ["genre"],
    queryFn: () => api.get("genre/movie/list").then((res) => res.data),
  });

  const genres: IGenre[] = data?.genres || [];

  return {
    genres,
    genreMap: genres,
  };
};
