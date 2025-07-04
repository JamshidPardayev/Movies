import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useGenre = () => {
  const { data } = useQuery({
    queryKey: ["genre"],
    queryFn: () =>
      api.get("genre/movie/list").then((res) => res.data.genres), 
  });

  const genreMap = data?.reduce((acc: Record<number, string>, genre: any) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  return { genres: data, genreMap };
};
