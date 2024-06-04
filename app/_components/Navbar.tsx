import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="px-4 pb-4 pt-3 flex justify-between items-center bg-gradient-to-b from-slate-700 to-transparent">
      <h1 className="text-3xl font-bold">
        <Link href={"/"}>SHRTNR</Link>
      </h1>
      <Link href={"#"} className="cursor-not-allowed">
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
