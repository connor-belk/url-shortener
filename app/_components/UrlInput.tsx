"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";
import ShortUrlOutput from "./ShortUrlOutput";

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmitUrlToServer = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setShortUrl("");
    setOriginalUrl("");

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
      toast.success("URL added successfully");
      setShortUrl(shortUrl);
      console.log(url, shortUrl);
      setOriginalUrl(url);
      setUrl("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <form
        id="url-form"
        onSubmit={handleSubmitUrlToServer}
        className="mx-2 flex flex-col items-center justify-center gap-4 w-full"
      >
        <label htmlFor="url-input" className="text-3xl">
          Enter your long URL:
        </label>
        <input
          type="url"
          id="url-input"
          name="url-input"
          value={url}
          placeholder="include http:// or https://"
          className="text-xl text-center px-4 py-2 rounded-lg bg-inherit border border-gray-300 w-full focus:outline-none focus:border-transparent focus:ring-2 focus:ring-slate-50"
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
      <Toaster />
    </div>
  );
};

export default UrlInput;
