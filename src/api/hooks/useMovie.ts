import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useMovie = () => {
  const getMovies = (params: any) => {
    const queryKey = ["movie", JSON.stringify(params)];

    return useQuery({
      queryKey,
      queryFn: () => api.get("discover/movie", { params }).then(res => res.data),
    });
  };

  return { getMovies };
};
