import Link from "next/link";

const ReturnButton = () => {
  return (
    <>
      <Link href="/">
        <button className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1 ml-4 mt-4 mb-2">
          Return
        </button>
      </Link>
    </>
  );
};

export default ReturnButton;
