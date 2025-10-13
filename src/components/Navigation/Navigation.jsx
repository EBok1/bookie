import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function Dropdown({ onToggle }) {
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
        <ul className="fixed top-[6.25rem] left-5 right-5 bg-[#fffdf6] shadow-md flex flex-col items-center py-4 gap-4 rounded-b border border-[#A55A16]">
          <li className="w-full justify-center items-center flex border-b border-[#A55A16] pb-4">
            <Link to="/" onClick={closeDropdown}>
              Home
            </Link>
          </li>
          <li className="w-full justify-center items-center flex border-b border-[#A55A16] pb-4">
            <Link to="/about" onClick={closeDropdown}>
              About
            </Link>
          </li>
          <li className="w-full justify-center items-center flex border-b border-[#A55A16] pb-4">
            <Link to="/contact" onClick={closeDropdown}>
              Contact
            </Link>
          </li>
          <li className="w-full justify-center items-center flex border-b border-[#A55A16] pb-4">
            <Link to="/login" onClick={closeDropdown}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/favorites" onClick={closeDropdown}>
              Favorites
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

function Navigation() {
  const [showBorder, setShowBorder] = useState(false);

  return (
    <>
      <div
        className={`sm:hidden flex justify-between items-center bg-[#fffdf6] rounded-md shadow-md mx-5 mt-5 ${
          showBorder ? "border border-[#A55A16] rounded-b-none" : "border border-transparent"
        }`}
      >
        <Logo />
        <Dropdown onToggle={setShowBorder} />
      </div>

      <nav className="hidden sm:flex justify-between items-center mr-6 mb-4 ml-3">
        <div>
          <Logo />
        </div>

        <div className="flex gap-20">
          <Link className="hover:text-blue-500" to="/">
            Home
          </Link>
          <Link className="hover:text-blue-500" to="/about">
            About
          </Link>
          <Link className="hover:text-blue-500" to="/contact">
            Contact
          </Link>
        </div>

        <div className="flex gap-5">
          <Link className="hover:text-blue-500" to="/login">
            Login
          </Link>
          <Link className="hover:text-blue-500" to="/favorites">
            Favorites
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
