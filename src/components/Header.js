"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Menu, X, Sun, Moon, ChevronDown, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaCartPlus, FaUserCircle } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";
import axios from "@/lib/axios";
import { useCampus } from "@/contexts/CampusContext";
import SearchBox from "./SearchBox";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { campuses, openSelector } = useCampus();

  const params = useParams();
  const campusId = params.campusId;
  const selectedCampus = campuses.find((c) => c._id === campusId || c.shortName === campusId);

  const getLocalStorage = (name) => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(name);
  };

  const userMenuItems = [
    // {
    //   key: "profile",
    //   icon: <User className="h-4 w-4" />, //TODO:will add later//
    //   label: "Profile",
    // },
    {
      key: "logout",
      icon: <LogOut className="h-4 w-4" />,
      label: "Logout",
      danger: true,
    },
  ];

  const handleUserMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    } else if (key === "profile") {
      // Handle profile navigation
      window.location.href = "/profile";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.dispatchEvent(new Event("authChange"));
    setIsAuthenticated(false);
    setUserName("");
    setRole("");
  };

  const getFirstName = (fullName) => {
    return fullName ? fullName.split(" ")[0] : "";
  };

  const checkAuth = useCallback(() => {
    const authToken = getLocalStorage("authToken");
    const refreshToken = getLocalStorage("refreshToken");
    if (authToken && refreshToken) {
      axios
        .get("/users/profile")
        .then((res) => {
          setUserName(res.data.data.name);
          setRole(res.data.data.role);
          setIsAuthenticated(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setRole("");
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setRole("");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, [checkAuth]);

  return (
    <div>
      <header className="w-full font-sans shadow-md bg-orange-500 text-primary-foreground">
        <div className="py-2 px-2 md:px-3 lg:px-4 2xl:px-6">
          {/* Main Header Bar */}
          <div className="relative flex items-center justify-between h-10 md:h-12 lg:h-16 2xl:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center relative ">
              <Image
                src="/images/logo1.png"
                alt="Campusian Shop Logo"
                className="w-[120px]! h-auto md:w-[100px]! lg:w-[130px]! 2xl:w-[160px]! object-contain"
                width={130}
                height={96}
                priority
              />
            </Link>

            {/* Centered Search Bar - Enhanced for Desktop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex lg:flex flex-grow max-w-3xl lg:mx-6 flex-col items-center w-full">
              {/* <div className="w-full 2xl:ml-9"> */}
              <div className="flex items-center  text-sm mb-1">
                <IoLocationSharp className="text-base text-white" />
                <span
                  className="uppercase lg:text-[12px] md:text-[10px] 2xl:text-sm font-semibold text-white cursor-pointer"
                  onClick={openSelector}
                >
                  {selectedCampus ? selectedCampus.name : "Select Campus"}
                </span>
              </div>
              <SearchBox />
              {/* </div> */}
            </div>

            <div className=" flex flex-col items-end justify-center gap-1 2xl:gap-0">
              <div className="hidden md:flex items-center md:text-[10px] lg:text-[12px] 2xl:text-base 2xl:gap-1 font-medium">
                <Link href="/support" className="uppercase text-white px-2 py-1 rounded hover:bg-white/10 transition-colors">
                  Help & Support
                </Link>

                {isLoading ? (
                  <span className="uppercase text-white">Loading...</span>
                ) : isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center space-x-1 uppercase bg-transparent border-none text-white cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-all">
                        <span>{getFirstName(userName)}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-secondary" align="end">
                      {userMenuItems.map((item) => (
                        <DropdownMenuItem
                          key={item.key}
                          onClick={() => handleUserMenuClick({ key: item.key })}
                          className={item.danger ? "text-red" : ""}
                        >
                          {item.icon}
                          <span className="ml-2">{item.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/login" className="uppercase hover:bg-white/10 text-white px-2 py-1 rounded transition-all">
                      Login
                    </Link>
                    <Link href="/register" className="uppercase hover:bg-white/10 text-white px-2 py-1 rounded transition-all">
                      Register
                    </Link>
                  </>
                )}
              </div>

              <div className="hidden md:flex items-center justify-between gap-2.5 2xl:gap-4">
                <button
                  onClick={toggleTheme}
                  className="relative 2xl:text-[33px] text-white hover:text-white hover:scale-110 transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <Moon className=" 2xl:text-[25px]" /> : <Sun className=" 2xl:text-[25px]" />}
                </button>

                <Link href="/cart" className="relative text-white flex items-center hover:text-white hover:scale-110 transition-all">
                  <FaCartPlus className="text-[20px] 2xl:text-[25px]" />
                </Link>

                {!isAuthenticated ? (
                  <Link
                    href="/become-seller"
                    className="flex items-center bg-white text-orange-500 md:text-[10px] lg:text-[12px] 2xl:text-base md:px-1.5 md:py-1 lg:px-2.5 lg:py-1 rounded-md hover:bg-blue-100  transition-all font-semibold shadow"
                  >
                    Become a Seller
                  </Link>
                ) : role === "user" ? (
                  <Link
                    href="/become-seller"
                    className="flex items-center bg-white text-orange-500 md:text-[10px] lg:text-[12px] 2xl:text-[22px] md:px-1.5 md:py-1 lg:px-2.5 lg:py-1 rounded-md hover:bg-blue-100 transition-all font-semibold shadow"
                  >
                    Become a Seller
                  </Link>
                ) : role === "seller" ? (
                  <Link
                    href="/seller-dashboard"
                    className="flex items-center bg-white text-orange-500 md:text-[10px] lg:text-[12px] 2xl:text-[22px] md:px-1.5 md:py-1 lg:px-2.5 lg:py-1 rounded-md hover:bg-blue-100  transition-all font-semibold shadow"
                  >
                    Dashboard
                  </Link>
                ) : role === "admin" ? (
                  <Link
                    href="/admin"
                    className="flex items-center bg-white text-orange-500 md:text-[10px] lg:text-[12px] 2xl:text-[22px] md:px-1.5 md:py-1 lg:px-2.5 lg:py-1 rounded-md hover:bg-blue-100 transition-all font-semibold shadow"
                  >
                    Admin Dashboard
                  </Link>
                ) : null}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                {isMenuOpen ? "" : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Improved Layout */}
        <div
          className={`md:hidden fixed inset-0 bg-black/45 bg-opacity-50 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Section with Logo */}
            <div className="flex flex-col border-b border-gray-200">
              <div className="flex items-center justify-between p-4">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src="/images/dummyLogo.png"
                    alt="Campusian Shop Logo"
                    className="w-[100px] h-auto object-contain"
                    width={100}
                    height={74}
                    priority
                  />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              <div className="flex items-center space-x-2 px-4 pb-4">
                <IoLocationSharp className="text-orange-500 text-xl" />
                <span className="text-sm font-semibold text-gray-800 cursor-pointer" onClick={openSelector}>
                  {selectedCampus ? selectedCampus.name : "Select Campus"}
                </span>
              </div>
            </div>

            {/* Search Section */}
            {/* <div className="p-4 border-b border-gray-200">
            <SearchBox />
          </div> */}

            {/* Main Actions */}
            <div className=" flex flex-col items-start p-4 space-y-4">
              {!isAuthenticated ? (
                <Link
                  href="/become-seller"
                  className="block w-full py-2 text-center text-orange-500 bg-white border-2 border-orange-500 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Become a Seller
                </Link>
              ) : role === "user" ? (
                <Link
                  href="/become-seller"
                  className="block w-full py-2 text-center text-orange-500 bg-white border-2 border-orange-500 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Become a Seller
                </Link>
              ) : role === "seller" ? (
                <Link
                  href="/seller-dashboard"
                  className="block w-full py-2 text-center text-orange-500 bg-white border-2 border-orange-500 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : role === "admin" ? (
                <Link
                  href="/admin"
                  className="block w-full py-2 text-center text-orange-500 bg-white border-2 border-orange-500 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              ) : null}

              <Link
                href="/cart"
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaCartPlus className="h-5 w-5" />
                <span>Cart</span>
              </Link>

              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors w-full text-left"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>Theme</span>
              </button>
              <Link
                href="/support"
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Help & Support</span>
              </Link>
            </div>

            {/* User Section */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50 p-4 space-y-3">
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="h-6 w-6 text-gray-600" />
                  <span className="text-gray-600">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 text-gray-800">
                    <FaUserCircle className="h-6 w-6" />
                    <span className="font-medium">Welcome, {userName}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-2 text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="block w-full py-2 text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full py-2 text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="md:hidden px-4 py-4 bg-primary ">
        <SearchBox />
      </div>
    </div>
  );
};

export default Header;
