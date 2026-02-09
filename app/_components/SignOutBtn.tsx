"use client";

// import { sign } from "crypto";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const SignOutBtn = () => {
  return (
    <button
      className="px-4 py-2 rounded-lg bg-slate-700 text-white"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
