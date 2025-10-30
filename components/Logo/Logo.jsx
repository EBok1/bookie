import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo"
        width={80}
        height={80}
        className="flex h-20"
      />
    </Link>
  );
}

export default Logo;
