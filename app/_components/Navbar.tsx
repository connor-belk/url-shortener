import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import SignOutBtn from "./SignOutBtn";
import SignInBtn from "./SignInBtn";
import { Sign } from "crypto";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="px-4 pb-4 pt-3 flex items-center justify-between bg-gradient-to-b from-slate-700 to-transparent">
      <h1 className="text-3xl font-bold">
        <Link href={"/"}>SHRTNR</Link>
      </h1>
      {session ? (
        <div className="flex items-center gap-4">
          <p>
            <Link
              href={"/dashboard"}
              className="hover:underline transition-all duration-150"
            >
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image}
                  width={40}
                  height={40}
                  alt="img"
                  className="rounded-full"
                />
              ) : (
                session?.user?.name
              )}
            </Link>
          </p>
          <SignOutBtn />
        </div>
      ) : (
        <SignInBtn provider="google" />
      )}
    </nav>
  );
};

export default Navbar;
