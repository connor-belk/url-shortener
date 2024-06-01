"use client";

const ShortUrlOutput = ({ shortUrl }: any) => {
  const handleCopyShortUrl = () => {
    if (!document.getElementById("short-url-text")?.innerText) return;
    const shortUrlText = document.getElementById("short-url-text")?.innerHTML;
    navigator.clipboard.writeText(shortUrlText!);
    console.log("copied:", shortUrlText);
  };

  if (!shortUrl) return null;
  return (
    <div>
      <p className="text-3xl">Your short URL:</p>
      <p id="short-url-text" className="text-2xl px-5 py-1 border rounded-lg">
        {shortUrl}
      </p>
      <button onClick={handleCopyShortUrl}>Copy Short Link</button>
    </div>
  );
};

export default ShortUrlOutput;
