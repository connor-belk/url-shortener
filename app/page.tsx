import Image from "next/image";
import UrlInput from "./_components/UrlInput";
import ShortUrlOutput from "./_components/ShortUrlOutput";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 max-h-screen my-auto w-[80%] max-w-[600px] mx-auto">
      <UrlInput />
      <ShortUrlOutput />
    </main>
  );
}
