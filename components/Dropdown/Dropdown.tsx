"use client";
import Link from "next/link";
import { useDropdown } from "./hooks/useDropdown";

type MenuItem = {
  href: string;
  label: string;
}

type DropdownProps = {
  onToggle: () => void;
  menuItems: MenuItem[];
}

function Dropdown({ onToggle, menuItems }: DropdownProps) {
    const {isOpen, toggleDropdown, closeDropdown} = useDropdown(onToggle);
   
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

export default Dropdown;