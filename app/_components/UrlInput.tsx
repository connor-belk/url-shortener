"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import ShortUrlOutput from "./ShortUrlOutput";

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmitUrlToServer = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      url: formData.get("url-input") as string,
    };

    const response = await fetch("/api/addUrl", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const { url, shortUrl } = await response.json();
      setShortUrl(shortUrl);
      console.log(url, shortUrl);
      setOriginalUrl(url);
      setUrl("");
    }
  };

  const handleCopyShortUrl = () => {
    if (!document.getElementById("short-url-text")?.innerText) return;
    const shortUrlText = document.getElementById("short-url-text")?.innerHTML;
    navigator.clipboard.writeText(shortUrlText!);
    console.log("copied:", shortUrlText);
  };

  return (
    <div className="w-[800px] flex flex-col items-center justify-center gap-4">
      <form
        id="url-form"
        onSubmit={handleSubmitUrlToServer}
        className="flex flex-col items-center justify-center gap-4 w-full"
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
      {shortUrl && (
        <ShortUrlOutput shortUrl={shortUrl} originalUrl={originalUrl} />
      )}
    </div>
  );
};

export default UrlInput;
