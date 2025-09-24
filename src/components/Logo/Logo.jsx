import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="flex h-20" />
      </Link>
    </>
  );
}

export default Logo;
