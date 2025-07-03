import { Link, NavLink } from "react-router-dom";
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
import React, { useEffect, useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
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

        <div className="flex gap-6 items-center">
          <div className="hover:text-[#C61F1F] cursor-pointer text-[20px] duration-300">
            <SearchOutlined />
          </div>
          <button
            onClick={handleTheme}
            className="text-[20px] hover:text-[#C61F1F] duration-300"
          >
            {darkMode ? <SunOutlined /> : <MoonOutlined />}
          </button>
          <button className="h-[45px] rounded-[10px] bg-[#C61F1F] px-5 text-white hover:bg-red-500 duration-300 font-medium max-sm:hidden">
            Login
          </button>

          <div
            className="sm:hidden text-[22px] cursor-pointer hover:text-[#C61F1F] duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuOutlined />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden fixed top-[0px] left-0 h-screen w-full bg-white dark:bg-black  z-40 py-4">
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
            <button
              onClick={() => setMenuOpen(false)}
              className="h-[40px] w-[90%] bg-[#C61F1F] text-white rounded-[8px] hover:bg-red-500 duration-300"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Header);
