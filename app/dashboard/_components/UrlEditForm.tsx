"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  url: {
    id: string;
    shortUrl: string;
    nickname: string | null;
    redirectTo: string;
    hits: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    ownerId: string | null;
    enabled: boolean;
    expiresAt: Date | null;
  };
};

export default function UrlEditForm({ url }: Props) {
  const router = useRouter();
  const [nickname, setNickname] = useState(url.nickname ?? "");
  const [shortUrl, setShortUrl] = useState(url.shortUrl.split("/").pop() ?? "");
  const [expiresAt, setExpiresAt] = useState<Date | undefined>(
    url.expiresAt ? new Date(url.expiresAt) : undefined
  );
  const [shortUrlError, setShortUrlError] = useState("");

  function validateShortUrl(value: string) {
    if (value.length < 7) return "Must be at least 7 characters.";
    if (value.length > 14) return "Must be 14 characters or fewer.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const error = validateShortUrl(shortUrl);
    if (error) {
      setShortUrlError(error);
      return;
    }
    await fetch(`/api/url/${url.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, shortUrl, expiresAt: expiresAt ?? null }),
    });
    router.push("/dashboard");
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 text-xl"
      >
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <label htmlFor="nickname">Set a Nickname:</label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            className="active:outline-none focus:outline-none bg-inherit border border-white/40 rounded-xl px-4 py-2 text-white text-center"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-start gap-3">
          <label htmlFor="shortUrl" className="text-xl">
            Set a Custom URL:
          </label>
          <input
            type="text"
            name="shortUrl"
            id="shortUrl"
            className="active:outline-none focus:outline-none bg-inherit border border-white/40 rounded-xl px-4 py-2 text-white text-center text-xl"
            value={shortUrl}
            onChange={(e) => {
              setShortUrl(e.target.value);
              setShortUrlError(validateShortUrl(e.target.value));
            }}
          />
          {shortUrlError && (
            <p className="text-red-400 text-sm">{shortUrlError}</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-3">
          <label htmlFor="expiresAt">Pick an Expiration Date:</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-60 justify-start gap-2 text-left text-xl font-normal bg-inherit border border-white/40 rounded-xl px-4 py-2 h-auto text-white hover:bg-white/10 hover:text-white"
              >
                <CalendarIcon className="size-4" />
                {expiresAt ? format(expiresAt, "PPP") : "No expiration"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={expiresAt}
                onSelect={setExpiresAt}
                disabled={(date) => date < new Date()}
              />
              {expiresAt && (
                <div className="border-t p-3 text-center">
                  <button
                    type="button"
                    onClick={() => setExpiresAt(undefined)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear expiration
                  </button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <input
          type="submit"
          className="px-5 py-2 text-2xl text-black bg-blue-400 rounded-xl cursor-pointer"
        />
      </form>
    </div>
  );
}
