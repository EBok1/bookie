import Link from "next/link";

function Logo() {
  return (
    <>
      <Link href="/">
        <img src="/logo.png" alt="Logo" className="flex h-20" />
      </Link>
    </>
  );
}

export default Logo;
