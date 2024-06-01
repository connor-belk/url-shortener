import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="px-4 pb-4 pt-3 flex justify-between items-center bg-gradient-to-b from-slate-700 to-transparent">
      <h1 className="text-3xl font-bold">SHRTNR</h1>
      <Link href={"#"}>Login</Link>
    </nav>
  );
};

export default Navbar;
