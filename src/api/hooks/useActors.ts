import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useActors = () => {
  const getActorsDetails = (id: string) =>
    useQuery({
      queryKey: ["actor", id],
      queryFn: () => api.get(`person/${id}`).then((res) => res.data),
    });

  const getActorsMovie = (id: string) =>
    useQuery({
      queryKey: ["actor-movies", id],
      queryFn: () => api.get(`person/${id}/movie_credits`).then((res) => res.data),
      enabled: !!id,
    });

  return { getActorsDetails, getActorsMovie };
};
