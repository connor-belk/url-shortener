import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

const ONE_DAY = 1000 * 60 * 60 * 24;

export async function POST(req: NextRequest) {
  const { url, customTailEnd } = await req.json();
  if (!url) return new Response("invalid url", { status: 400 });
  const session = await auth();

  let shortUrl = `${req.nextUrl.host}/api`;

  if (customTailEnd) {
    if (!session) return new Response("not logged in", { status: 401 });
    if (customTailEnd.length > 14)
      return new Response("too long", { status: 400 });
    if (customTailEnd.length < 7)
      return new Response("too short", { status: 400 });
    shortUrl = `${shortUrl}/${customTailEnd}`;
  } else {
    shortUrl = `${shortUrl}/${nanoid(8)}`;
  }

  //   console.log(url, shortUrl, customTailEnd);

  const redirectObject = await prisma.redirectLinks.findUnique({
    where: { shortUrl: shortUrl },
  });

  while (redirectObject) {
    console.log("redirect url already exists. trying again");
    shortUrl = `${req.nextUrl.host}/api/${nanoid(8)}`;
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

  return Response.json({ url: url, shortUrl: shortUrl }, { status: 200 });
}
