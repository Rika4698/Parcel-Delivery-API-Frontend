"use client";
import {  useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeButton from "@/components/theme/ModeSwitch";
import { useUserInfoQuery } from '@/redux/features/auth/auth';
import { User2Icon, UserIcon } from 'lucide-react';
import UserAvatar from "@/components/Avatar";
import { Dropdown } from "@/components/Dropdown";
import { Link } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const { data, isLoading } = useUserInfoQuery(undefined);

 

  //  console.log(data);
    const [openDropdown, setOpenDropdown] = useState(false);



  const navItems = [
  { name: "Home", path: "/" },
  { name: "Track Parcel", path: "/track-parcel" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

  const avatarRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);


   const toggleDropdown = () => setOpenDropdown((prev)=> !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-6rem)] z-50 overflow-hidden rounded-full border-2 border-blue-600/20 dark:border-blue-800 backdrop-blur-lg mt-4 animate-slide-down">
        {/* Background */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-800 backdrop-blur-md"></div>

        {/* Floating Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute h-4 w-4 rounded-full bg-blue-400/10 dark:bg-gray-600 animate-float top-2 left-[6%]" />
          <div className="absolute h-3 w-3 rounded-full bg-blue-400/10 dark:bg-gray-600 animate-float top-8 left-[20%] [animation-delay:0.5s]" />
          <div className="absolute h-5 w-5 rounded-full bg-blue-400/10 dark:bg-gray-600 animate-float top-8 left-[33%] [animation-delay:0.5s]" />
          <div className="absolute h-5 w-5 rounded-full bg-blue-400/10 dark:bg-gray-600 animate-float top-6 left-[70%] [animation-delay:1s]" />
           <div className="absolute h-5 w-5 rounded-full bg-blue-400/10 dark:bg-gray-600 animate-float top-4 left-[80%] [animation-delay:1s]" />
          <div className="absolute h-6 w-6 rounded-full bg-blue-400/10 dark:bg-gray-600 animate-float top-2 left-[60%] [animation-delay:1.5s]" />
        </div>

        {/* Navbar Content */}
        <div className="relative px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <img
            className="w-40 sm:w-48 h-[70px] sm:h-[75px]"
            src="https://i.ibb.co.com/chw8TdMt/delivo-high-resolution-logo-transparent.png"
            alt="Delivo Logo"
          />

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group text-blue-500 dark:text-blue-200 transition font-medium text-base xl:text-lg ${
                  active === item.name ? "text-blue-700 dark:text-blue-400" : "hover:text-blue-700 dark:hover:text-blue-400"
                }`}
                onClick={()=> setActive(item.name)}
              >
                {item.name}
                <div
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 ${
                    active === item.name
                      ? "w-full opacity-100"
                      : "w-0 group-hover:w-full opacity-70"
                  }`}
                ></div>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2.5 lg:space-x-4">
            <ThemeButton />
           <div  className="relative" ref={avatarRef} >
            {isLoading ? (
              <User2Icon className="w-6 h-6" />
            ) : data?.data ? (
              <>
                <button
                
                  onClick={toggleDropdown}
                  className="cursor-pointer flex items-center gap-1 p-2 text-gray-800 dark:text-gray-100 rounded-full bg-gray-100 dark:bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  {data?.data?.picture ? (
                    <UserAvatar user={data?.data} />
                  ) : (
                    <UserIcon className="w-6 h-6 " />
                  )}
                </button>
             
              </>
            ) : (
              <button className="rounded bg-blue-600 dark:bg-blue-400 p-2 text-sm font-semibold text-white">
                <Link to="/login">LogIn</Link>
              </button>
            )}
          </div>

















            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden relative group"
              aria-label="Toggle mobile menu"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-cyan-300 rounded blur opacity-60 group-hover:opacity-100 transition"></div>
              <div className="relative p-2 bg-blue-600 dark:bg-blue-700 rounded">
                <Menu className="w-5 h-5 text-white dark:text-blue-200 group-hover:text-white" />
              </div>
            </button>
          </div>
        </div>
      </nav>


     
      {openDropdown && (
        <div
          ref={dropdownRef}
          onClick={e => e.stopPropagation()}
          className="fixed top-[97px] right-10 w-60 sm:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-lg drop-shadow-xl z-[1000] animate-fade-in"
        >
          <Dropdown isOpen={openDropdown} userData={data?.data} onClose={() => setOpenDropdown(false)} />
        </div>
      )}


      {/* ===== MOBILE SIDEBAR ===== */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transform transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-blue-500/20 p-6 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-blue-600 dark:text-blue-400 hover:text-blue-800  dark:hover:text-blue-600  "
          >
            <X className="w-6 h-6" />
          </button>

          <nav className="mt-10 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  setActive(item.name);
                  setIsOpen(false);
                }}
                className={`block w-full text-center px-3 py-2 rounded-lg transition-all ${
                  active === item.name
                    ? "bg-blue-100 text-blue-700 dark:text-blue-600 font-medium"
                    : "text-blue-500 dark:text-blue-400 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
