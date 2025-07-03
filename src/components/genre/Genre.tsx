import type { IGenre } from "@/types";
import React, { type FC } from "react";

interface Props {
  data: IGenre[] | undefined;
  selectedGenres: string[];
  onToggle: (id: number) => void;
}

const Genre: FC<Props> = ({ data, selectedGenres, onToggle }) => {
  return (
    <div className="flex overflow-auto gap-6 scrollbar-thin scrollbar-thumb-gray-400">
      {data?.map((item) => (
        <div
          key={item.id}
          onClick={() => onToggle(item.id)}
          className={`text-nowrap mb-2 font-medium cursor-pointer select-none px-3 rounded ${
            selectedGenres.includes(item.id.toString())
              ? "bg-black text-white dark:bg-white dark:text-black"
              : ""
          }`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Genre);
