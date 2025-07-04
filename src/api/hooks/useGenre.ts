import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import { IGenre } from "@/types"; // agar sizda IGenre tipi bo‘lsa

export const useGenre = () => {
  const { data } = useQuery({
    queryKey: ["genre"],
    queryFn: () => api.get("genre/movie/list").then((res) => res.data),
  });

  const genres: IGenre[] = data?.genres || [];

  return {
    genres, // array ko‘rinishida barcha janrlar
    genreMap: genres, // map qilish uchun uzatiladi
  };
};
