import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="px-4 pb-4 pt-3 w-screen flex items-center justify-between bg-gradient-to-b from-slate-700 to-transparent">
      <h1 className="text-3xl font-bold">
        <Link href={"/"}>SHRTNR</Link>
      </h1>
      <Link href={"#"} className="cursor-not-allowed text-xl">
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
