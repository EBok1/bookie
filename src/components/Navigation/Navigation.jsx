import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative flex justify-between mr-6 mb-4 ml-3">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <button
        onClick={toggleDropdown}
        className="text-lg font-semibold"
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
          <li>
            <Link to="/favorites">Favorites❤️</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // User has scrolled down
      } else {
        setIsScrolled(false); // User is at top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {!isScrolled ? (
        // Initial layout: Logo and menu on same line
        <div className="sm:hidden flex justify-between items-center mr-3 mb-4 ml-3">
          <Logo />
          <Dropdown />
        </div>
      ) : (
        // Scrolled layout: Only sticky menu
        <>
          <div className="sm:hidden mr-6 mb-4 ml-3">
            <Logo />
          </div>
          <div className="sm:hidden fixed top-0 right-3 z-10 py-2">
            <Dropdown />
          </div>
        </>
      )}
      {/* Desktop Version - Hidden on mobile */}

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
            Favorites❤️
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
