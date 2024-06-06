"use client";

import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <button
      className="px-4 py-2 rounded-lg bg-slate-700 text-white"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
