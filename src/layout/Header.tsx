import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/main-logo.svg";
import {
  HeartOutlined,
  HomeOutlined,
  MenuOutlined,
  MoonOutlined,
  SearchOutlined,
  SunOutlined,
  VideoCameraOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { useDebounce } from "@/hooks/useDebounce";
import { IMAGE_URL } from "@/const";
import defaultImg from "@/assets/default.jpg";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  const credential = localStorage.getItem("credential");
  const decoded: any = credential ? jwtDecode(credential) : null;
  const userImage = decoded?.picture;
  const userName = decoded?.family_name || decoded?.name || "User";
console.log(credential);

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      api
        .get("search/movie", {
          params: {
            query: debouncedQuery,
          },
        })
        .then((res) => res.data.results),
    enabled: debouncedQuery.length > 0,
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="shadow shadow-gray-400 dark:shadow-slate-900 mb-5 relative z-50">
      <div className="container flex justify-between items-center h-[80px]">
        <Link to={"/"}>
          <img src={logo} alt="Logo" />
        </Link>

        <div className="flex gap-6 text-[16px] font-semibold max-sm:hidden">
          <NavLink to="/" className="navActive flex flex-col items-center">
            <HomeOutlined />
            <p>Home</p>
          </NavLink>
          <NavLink
            to="/movies"
            className="navActive flex flex-col items-center"
          >
            <VideoCameraOutlined />
            <p>Movies</p>
          </NavLink>
          <NavLink
            to="/favorites"
            className="navActive flex flex-col items-center"
          >
            <HeartOutlined />
            <p>Favorites</p>
          </NavLink>
        </div>

        <div className="flex gap-6 items-center relative">
          <div
            onClick={() => setSearchOpen((prev) => !prev)}
            className="hover:text-[#C61F1F] cursor-pointer text-[20px] duration-300"
          >
            <SearchOutlined />
          </div>

          <button
            onClick={handleTheme}
            className="text-[20px] hover:text-[#C61F1F] duration-300"
          >
            {darkMode ? <SunOutlined /> : <MoonOutlined />}
          </button>

          {credential ? (
            <div className="flex items-center gap-2">
              <img
                src={userImage}
                alt="User"
                className="w-[40px] h-[40px] rounded-full object-cover border-2 border-[#C61F1F]"
              />
              <span className="text-white font-medium">{userName}</span>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="h-[45px] rounded-[10px] bg-[#C61F1F] px-5 text-white hover:bg-red-500 duration-300 font-medium max-sm:hidden"
            >
              Login
            </button>
          )}

          <div
            className="sm:hidden text-[22px] cursor-pointer hover:text-[#C61F1F] duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuOutlined />
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#1f1f1f] p-4 shadow-lg z-40">
          <input
            type="text"
            className="w-full p-2 border rounded-md outline-none text-black dark:text-white dark:bg-gray-800"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isLoading && (
            <p className="flex items-center mt-2 text-gray-500">
              Loading...
              <span className="loader ml-3"></span>
            </p>
          )}
          {!isLoading && searchResults?.length > 0 && (
            <div className="mt-2 max-h-[300px] overflow-y-auto custom-scroll">
              {searchResults.map((movie: any) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="block p-2 border-b hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
                  onClick={() => {
                    setQuery("");
                    setSearchOpen(false);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={
                        movie?.poster_path
                          ? IMAGE_URL + movie?.poster_path
                          : defaultImg
                      }
                      alt={movie?.title}
                      className="w-[80px] h-[50px] rounded object-cover"
                    />
                    <h3 className="line-clamp-1">{movie?.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {!isLoading &&
            debouncedQuery.length > 0 &&
            searchResults?.length === 0 && (
              <p className="mt-2 text-gray-500">No movies found</p>
            )}
        </div>
      )}

      {menuOpen && (
        <div className="sm:hidden fixed top-0 left-0 h-screen w-full bg-white dark:bg-black z-40 py-4">
          <div className="flex flex-col items-center gap-4 text-[16px] font-semibold">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full flex justify-end mr-5 mt-3 text-[22px] dark:text-gray-100 cursor-pointer hover:text-[#C61F1F] duration-300"
            >
              <CloseOutlined />
            </button>

            <NavLink
              to="/"
              className="navActive flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <HomeOutlined />
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className="navActive flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <VideoCameraOutlined />
              Movies
            </NavLink>
            <NavLink
              to="/favorites"
              className="navActive flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <HeartOutlined />
              Favorites
            </NavLink>

            {credential ? (
              <div className="flex items-center gap-2 mt-4">
                <img
                  src={userImage}
                  alt="User"
                  className="w-[40px] h-[40px] rounded-full object-cover border-2 border-[#C61F1F]"
                />
                {/* <p className="text-black font-black">{userName}</p> */}
              </div>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="h-[40px] w-[90%] bg-[#C61F1F] text-white rounded-[8px] hover:bg-red-500 duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Header);
