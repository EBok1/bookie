import { Link } from "react-router-dom";

const ReturnButton = () => {
  return (
    <>
    <Link to="/">
      <button className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 mb-4 ml-2">
        Return 
      </button>
      </Link>
    </>
  );
}

export default ReturnButton;
