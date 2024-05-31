import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <h1>Home</h1>
      <div className="bg-white inline-block px-5 py-1 rounded-md bg-gradient-radial from-white to-black/100 ">
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </div>
    </main>
  );
}
