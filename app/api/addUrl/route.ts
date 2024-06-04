import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) return new Response("invalid url", { status: 400 });

  let shortUrl = `${req.nextUrl.host}/api/${nanoid(8)}`;

  const redirectObject = await prisma.redirectLinks.findUnique({
    where: { shortUrl: shortUrl },
  });

  while (redirectObject) {
    console.log("redirect url already exists. trying again");
    shortUrl = `${req.nextUrl.host}/api/${nanoid(8)}`;
  }

  // console.log(url, shortUrl);

  await prisma.redirectLinks.create({
    data: {
      shortUrl: shortUrl,
      redirectTo: url,
    },
  });

  return Response.json({ url: url, shortUrl: shortUrl }, { status: 200 });
}
