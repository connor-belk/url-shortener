"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col items-center m-5 mt-10  text-center text-lg gap-4">
      <h2 className="text-5xl font-bold">
        Uh Oh! <span className="text-red-500">404</span>
      </h2>
      <p className="text-2xl">
        We&apos;re sorry, but we couldn&apos;t find the page you&apos;re looking
        for!
      </p>
      <p>Please try again or go back to the homepage.</p>
      <p>If you think this is a mistake, please contact us.</p>
      <div className="flex gap-4">
        <Link href="/" className="underline italic ">
          Go to homepage
        </Link>
        <button
          className="underline italic cursor-pointer"
          onClick={() => router.back()}
        >
          Or go back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
