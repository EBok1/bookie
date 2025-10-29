"use client";
import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import Link from "next/link";

function Dropdown({ onToggle, menuItems }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    onToggle(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
        onToggle(false);
      }
    };
    if (isOpen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative flex justify-between mr-6 ml-3">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <button onClick={toggleDropdown} className="text-lg font-semibold">
        Menu <i className="fa fa-bars pl-1"></i>
      </button>
      {isOpen && (
        <ul className="fixed top-[6.25rem] left-5 right-5 bg-[#fffdf6] shadow-md flex flex-col items-center pt-4 gap-4 rounded-b border border-[#A55A16]">
          {menuItems.map((item) => (
            <li
              key={item.href}
              className="w-full justify-center items-center flex border-b border-[#A55A16] pb-4"
            >
              <Link href={item.href} onClick={closeDropdown}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Navigation() {
  const [showBorder, setShowBorder] = useState(false);
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
    { label: "Favorites", href: "/favorites" },
  ];

  return (
    <>
      <div
        className={`sm:hidden flex justify-between items-center bg-[#fffdf6] rounded-md shadow-md mx-5 mt-5 ${
          showBorder
            ? "border border-[#A55A16] rounded-b-none"
            : "border border-transparent"
        }`}
      >
        <Logo />
        <Dropdown onToggle={setShowBorder} menuItems={menuItems} />
      </div>

      <nav className="hidden sm:flex justify-between items-center bg-[#fffdf6] rounded-md shadow-md mx-5 mt-5 pl-3 pr-5">
        <div>
          <Logo />
        </div>

        <div className="flex gap-20">
          {menuItems.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              className="hover:text-blue-500"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-5">
          {menuItems.slice(3).map((item) => (
            <Link
              key={item.href}
              className="hover:text-blue-500"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
