import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/swankylogo.png"
        alt="Swanky Shears Logo"
        width={136}
        height={67}
        className="md:hidden"
      />
      <Image
        src="/swankylogomd.png"
        alt="Swanky Shears Logo"
        width={300}
        height={67}
        className="hidden md:block"
      />
      {/* <span className="text-xl font-bold">Swanky Shears</span> */}
    </Link>
  );
}
