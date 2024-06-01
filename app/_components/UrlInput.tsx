"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import ShortUrlOutput from "./ShortUrlOutput";

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const hostname = "localhost:3000/";

  const handleSubmitUrl = (e: any) => {
    e.preventDefault();
    if (!url) return;
    // Check if URL is valid and not used yet? (Need some way to use server for async validation)
    setShortUrl(hostname + nanoid(7)); // Generates a random short URL
    console.log(url, shortUrl);
    setUrl("");
  };

  const handleCopyShortUrl = () => {
    if (!document.getElementById("short-url-text")?.innerText) return;
    const shortUrlText = document.getElementById("short-url-text")?.innerHTML;
    navigator.clipboard.writeText(shortUrlText!);
    console.log("copied:", shortUrlText);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <form
        id="url-form"
        onSubmit={handleSubmitUrl}
        className="flex flex-col items-center justify-center gap-4"
      >
        <label htmlFor="url-input" className="text-3xl">
          Enter your long URL:
        </label>
        <input
          type="text"
          id="url-input"
          name="url-input"
          value={url}
          className="text-xl px-4 py-2 w-full rounded-lg bg-inherit border border-gray-300 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-slate-50"
          onChange={(e: any) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="px-10 py-2 mb-5 bg-transparent text-slate-300 border border-white font-bold text-2xl rounded-full active:bg-green-500 active:text-slate-950 transition-all duration-150"
        >
          Submit
        </button>
      </form>
      {shortUrl && <ShortUrlOutput shortUrl={shortUrl} />}
      {/* DEBUG CONSOLE */}
      <div className="absolute bottom-0 right-0 bg-black text-white">
        <p>{shortUrl || "no short url found"}</p>
      </div>
    </div>
  );
};

export default UrlInput;
