import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Movies = lazy(() => import("./movies/Movies"));
const Favorites = lazy(() => import("./favorites/Favorites"));
const NotFound = lazy(() => import("./notFound/NotFound"));
const MoviesDetails = lazy(() => import("./movies/MoviesDetails"));
const ActorDetails = lazy(() => import("./actorDetails/ActorDetails"));

const MainRouter = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/movie/:id",
          element: <MoviesDetails />,
        },
        {
          path: "/actor/:id",
          element: <ActorDetails />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
};

export default MainRouter;
