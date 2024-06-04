import Image from "next/image";
import UrlInput from "./_components/UrlInput";
import ShortUrlOutput from "./_components/ShortUrlOutput";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 h-[650px]">
      <UrlInput />
      <ShortUrlOutput />
    </main>
  );
}
