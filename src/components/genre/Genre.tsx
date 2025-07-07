import type { IGenre } from "@/types";
import React, { type FC } from "react";

interface Props {
  data: IGenre[] | undefined;
  selectedGenres: string[];
  onToggle: (id: number) => void;
  isLoading?: boolean;
  expectedCount?: number;
}

const Genre: FC<Props> = ({
  data,
  selectedGenres,
  onToggle,
  isLoading,
  expectedCount = 12,
}) => {
  const skeletonCount = isLoading ? expectedCount : data?.length || 0;

  return (
    <div className="flex overflow-x-auto overflow-y-hidden gap-3 py-2 custom-scroll">
      {isLoading
        ? [...Array(skeletonCount)].map((_, index) => (
            <div
              key={index}
              className="min-w-[80px] h-[30px] bg-gray-300 dark:bg-slate-700 rounded-full animate-pulse"
            />
          ))
        : data?.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`text-sm font-medium cursor-pointer select-none px-4 h-[30px] text-center content-center rounded-full transition
                ${
                  selectedGenres.includes(item.id.toString())
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700"
                }
              `}
            >
              {item.name}
            </div>
          ))}
    </div>
  );
};

export default React.memo(Genre);
