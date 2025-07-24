import React, { useEffect, useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import type { IMovie } from "@/types";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: IMovie;
}

const FavoriteButton: React.FC<Props> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = stored.some((item: IMovie) => item.id === movie.id);
    setIsFavorite(exists);
  }, [movie.id]);

  const toggleFavorite = () => {
    const credential = localStorage.getItem("credential");

    if (!credential) {
      navigate("/login");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      const updated = stored.filter((item: IMovie) => item.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      stored.push(movie);
      localStorage.setItem("favorites", JSON.stringify(stored));
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="text-red-600 bg-gray-300 h-[40px] w-[40px] rounded-full cursor-pointer duration-300 text-lg hover:text-red-800"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <HeartFilled /> : <HeartOutlined />}
    </button>
  );
};

export default React.memo(FavoriteButton);
