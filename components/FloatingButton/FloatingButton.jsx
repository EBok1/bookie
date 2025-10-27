"use client";
import Link from "next/link";

export const FloatingButton = ({ children }) => {
  return (
    <Link
      href="/addbook"
      className="fixed bottom-4 right-6 bg-[#3D5E3F] px-3 py-3 rounded-full text-md font-medium text-white shadow-xl border-2 border-white cursor-pointer"
    >
      {children}
    </Link>
  );
};
