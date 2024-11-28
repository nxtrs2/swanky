import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  // { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "#location", label: "Find Us" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-300 hover:text-white uppercase"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden z-50 ">
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        <div
          className={`pb-8 absolute top-0 right-0 w-full  bg-gradient-to-br from-black via-gray-700 to-gray-900 text-white p-4 z-50 transform transition-transform duration-300 ease-in-out bg-opacity-70 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-9 right-6 text-gray-300 hover:text-white"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
          <nav className="flex flex-col space-y-4 mt-20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-gray-400 uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

// import Link from "next/link";
// import { Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// const navItems = [
//   { href: "#about", label: "About" },
//   { href: "/services", label: "Services" },
//   { href: "#location", label: "Find Us" },
// ];

// export default function Navbar() {
//   return (
//     <>
//       <nav className="hidden md:flex space-x-4">
//         {navItems.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className="text-gray-300 hover:text-white uppercase"
//           >
//             {item.label}
//           </Link>
//         ))}
//       </nav>
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button size="icon" className="md:hidden">
//             <Menu className="h-6 w-6" />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="right">
//           <nav className="flex flex-col space-y-3 mt-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="text-gray-500 hover:text-gray-400 uppercase"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }
