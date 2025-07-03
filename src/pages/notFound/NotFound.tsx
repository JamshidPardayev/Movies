import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <h1 className="text-[100px] max-md:text-[80px] max-sm:text-[60px] font-semibold text-center">
        Not Found!
      </h1>
      <p className="text-[80px] text-center font-medium">404</p>
      <Link to={"/"}>
        <button className="bg-[#C61F1F] h-[50px] w-[200px] rounded flex justify-center items-center mt-2 mx-auto hover:bg-red-500 cursor-pointer duration-300">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default React.memo(NotFound);
