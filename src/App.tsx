import { Suspense } from "react";
import MainRouter from "./pages";

const App = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-white">
      <Suspense
        fallback={
          <p className="flex justify-center items-center font-medium text-[25px] h-screen dark:bg-black">
            Loading... <span className="loader ml-3"></span>
          </p>
        }
      >
        <MainRouter />
      </Suspense>
    </div>
  );
};

export default App;
