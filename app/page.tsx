import UrlInput from "./_components/UrlInput";
import ShortUrlOutput from "./_components/ShortUrlOutput";

import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  // console.log(session);

  return (
    <main className="flex flex-col items-center justify-center gap-10 max-h-screen my-auto w-[80%] max-w-[600px] mx-auto">
      <UrlInput session={session} />
      <ShortUrlOutput />
      <Link href={"/legal/privacy"} className="text-center underline">
        Privacy Policy
      </Link>
    </main>
  );
}
