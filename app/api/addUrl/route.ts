import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

const ONE_DAY = 1000 * 60 * 60 * 24;

export async function POST(req: NextRequest) {
  const { url, customTailEnd } = await req.json();
  if (!url) return new Response("Invalid URL.", { status: 400 });

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return new Response("Invalid URL.", { status: 400 });
    }
  } catch (error) {
    return new Response("Invalid URL.", { status: 400 });
  }

  const session = await auth();

  let shortUrl = `${req.nextUrl.host}/api`;

  if (customTailEnd) {
    if (!session) return new Response("not logged in", { status: 401 });
    if (customTailEnd.length > 14)
      return new Response("too long", { status: 400 });
    if (customTailEnd.length < 7)
      return new Response("too short", { status: 400 });
    if (!/^[a-zA-Z0-9_-]+$/.test(customTailEnd))
      return new Response("invalid characters", { status: 400 });
    shortUrl = `${shortUrl}/${customTailEnd}`;
  } else {
    shortUrl = `${shortUrl}/${nanoid(8)}`;
  }

  //   console.log(url, shortUrl, customTailEnd);

  let redirectObject = await prisma.redirectLinks.findUnique({
    where: { shortUrl: shortUrl },
  });

  while (redirectObject) {
    console.log("Redirect url already exists. Trying again");
    shortUrl = `${req.nextUrl.host}/api/${nanoid(8)}`;
    redirectObject = await prisma.redirectLinks.findUnique({
      where: { shortUrl: shortUrl },
    });
  }

  let expiryDate = new Date(Date.now() + ONE_DAY * 30); // 30 days

  await prisma.redirectLinks.create({
    data: {
      shortUrl: shortUrl,
      redirectTo: url,
      ownerId: session?.user?.id || null,
      expiresAt: expiryDate,
    },
  });

  return Response.json({ url: url, shortUrl: shortUrl }, { status: 201 });
}
