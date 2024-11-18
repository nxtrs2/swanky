import Logo from "./logo";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="bg-black shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
