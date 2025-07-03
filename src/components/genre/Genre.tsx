import { useParamsHook } from "@/hooks/useParamsHook";
import type { IGenre } from "@/types";
import React, { type FC } from "react";

interface Props {
  data: undefined | IGenre[];
}

const Genre: FC<Props> = ({ data }) => {
  const { setParam, getParam, removeParam } = useParamsHook();
  const handleGenre = (id: number) => {
    if (genre === id.toString()) {
      removeParam("genre");
    } else {
      setParam("genre", id.toString());
    }
  };
  const genre = getParam("genre");

  return (
    <div className="flex overflow-auto gap-6">
      {data?.map((item: IGenre) => (
        <div
          onClick={() => handleGenre(item?.id)}
          className={`text-nowrap mb-2 font-medium cursor-pointer select-none px-3 rounded ${
            item?.id.toString() === genre
              ? "bg-black text-white dark:bg-white dark:text-black"
              : ""
          }`}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Genre);
