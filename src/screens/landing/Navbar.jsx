import { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative grid justify-end m-4">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <button onClick={toggleDropdown}>
        Menu <i className="fa fa-bars text-xl"></i>
      </button>
      {isOpen && (
        <ul className="fixed top-14 left-0 w-screen bg-white border shadow flex flex-col items-center py-4 gap-6">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      )}
    </div>
  );
}

function Nav() {
  return (
    <>
      <div className="sm:hidden">
        <Dropdown />
      </div>
      
      {/* Desktop Version - Hidden on mobile */}
      <nav className="hidden sm:flex justify-center gap-20 m-6">
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">About</a>
        <a href="#" className="hover:text-blue-500">Contact</a>
      </nav>
    </>
  );
}

export default Nav;
