import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BsList, BsX } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";

import logo from "../../images/logo.svg";
import PrimaryButton from "../buttons/PrimaryButton/index";
import SecondaryButton from "../buttons/SecondaryButton/index";
import Menus from "./Menus";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [backgroundwhite, setBackgroundWhite] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: "768px" });

  const handleWindowScroll = (e) => {
    const height = window.scrollY;
    const tresholdHeight = 50;

    if (height > tresholdHeight) {
      setBackgroundWhite(true);
    } else {
      setBackgroundWhite(false);
    }
  };

  const handleBlackScreenClick = (e) => {
    e.stopPropagation();
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (isMobile) {
      setDropdownOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    setBackgroundWhite(dropdownOpen);
  }, [dropdownOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);

    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [inputStyle, setInputStyle] = useState({
    backgroundColor: "black",
    color: "white",
  });

  const data = [
    "ProfessorETH",
    "ProfessorBTC",
    "ProfessorADam",
    "ProfessorRTA",
  ];
  const history = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      setResults(data);
      setInputStyle({
        backgroundColor: "black",
        color: "white",
      });
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (result) => {
    if (result === "ProfessorETH") {
      history.push("/signin");
    } else {
      setQuery(result);
      setInputStyle({
        backgroundColor: "black",
        color: "red",
      });
    }
  };
  return (
    <nav
      className={classNames(
        "fixed w-full transition-all duration-700 z-10 py-8 ",
        {
          "bg-black shadow-lg !py-3": backgroundwhite,
        }
      )}
    >
      <div className="px-4 container mx-auto top-0 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} className="mr-6" alt="Neva" />
          <div className="hidden mx-4 gap-8 xl:flex">
            <Menus />
          </div>
        </div>
        <div className="hidden gap-4 md:flex">
          <SecondaryButton>Sign In</SecondaryButton>

          <div className="relative w-13 mx-auto mt-2">
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 bg-blue-500 bg-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                style={inputStyle}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>
            {results.length > 0 && (
              <ul className="absolute w-full bg-gradient-to-r from-blue-200 to-black bg-opacity-10 backdrop-blur-md shadow-md rounded-md mt-2 max-h-60 overflow-y-auto">
                {results.map((result, index) => (
                  <li
                    key={index}
                    className="py-2 px-4 text-white hover:bg-black hover:text-white cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    {result}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="md:hidden text-2xl">
          <button
            className="z-50 p-4 block transition-all"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {dropdownOpen ? <BsX /> : <BsList />}
          </button>

          {/* Menu dropdown */}
          <div
            className={classNames({
              "text-base left-0 top-full right-0 absolute transition-all duration-400": true,
              "invisible opacity-0": !dropdownOpen,
              "visible opacity-100": dropdownOpen,
            })}
          >
            <div
              className="h-screen left-0 bg-black bg-opacity-30"
              onClick={handleBlackScreenClick}
            >
              <div className="z-20 shadow-xl bg-white p-6">
                <div className="gap-4 flex mb-6">
                  <SecondaryButton className="w-full">Sign In</SecondaryButton>
                  <PrimaryButton className="w-full">Sign Up</PrimaryButton>
                </div>
                <div className="mb-4">
                  <Menus />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
