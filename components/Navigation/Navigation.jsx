"use client";
import { useState } from "react";
import Logo from "../Logo/Logo";
import Link from "next/link";
import Dropdown from "../Dropdown/Dropdown";

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
