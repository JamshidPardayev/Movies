import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Movies = lazy(() => import("./movies/Movies"));
const Favorites = lazy(() => import("./favorites/Favorites"));
const Register = lazy(() => import("./register/Register"));
const Login = lazy(() => import("./login/Login"));
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
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
};

export default MainRouter;
