"use client";

import toast, { Toaster } from "react-hot-toast";

const ShortUrlOutput = ({ shortUrl, originalUrl }: any) => {
  const handleCopyShortUrl = () => {
    if (!document.getElementById("short-url-text")?.innerText) return;
    const shortUrlText = document.getElementById("short-url-text")?.innerHTML;
    navigator.clipboard.writeText(shortUrlText!);
    toast.success("Copied short URL to clipboard");
  };

  if (!shortUrl) return null;
  return (
    <div className="w-full">
      <p className="text-3xl">Your short URL for:</p>
      <textarea className="border p-2 text-lg rounded-lg bg-inherit w-full h-12 resize-none no-scrollbar text-center">
        {originalUrl}
      </textarea>
      <p
        id="short-url-text"
        className="text-3xl px-5 py-1 border rounded-lg text-center"
      >
        {shortUrl}
      </p>
      <button onClick={handleCopyShortUrl}>Copy Short Link</button>
      <Toaster />
    </div>
  );
};

export default ShortUrlOutput;
