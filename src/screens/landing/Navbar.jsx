import { useState } from "react";
import Logo from "./Logo";
import { Link } from 'react-router-dom';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative flex justify-between mr-6 mb-4 ml-3">
      <Logo />
      <button
        onClick={toggleDropdown}
        className="text-lg font-semibold font-quicksand"
      >
        Menu <i className="fa fa-bars pl-1"></i>
      </button>
      {isOpen && (
        <ul className="fixed top-14 left-0 w-screen bg-white border shadow flex flex-col items-center py-4 gap-6">
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/about">About</Link>
          </li>
          <li>
          <Link to="/contact">Contact</Link>
          </li>
          <li>
          <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

function Nav() {
  return (
    <>
     <div className="sticky top-0">
      <div className="sm:hidden">
        <Dropdown />
      </div>
      </div>
      {/* Desktop Version - Hidden on mobile */}

      <nav className="hidden sm:flex justify-between items-center mr-6 mb-4 ml-3">
        <div>
          <Logo />
        </div>

        <div className="flex gap-20">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>

        <div>
          <Link to="/login" className="hover:text-blue-500">
            Login
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Nav;
