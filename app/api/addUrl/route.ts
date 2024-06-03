import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { url } = await req.json();
  const shortUrl = `${process.env.HOSTNAME}/api/${nanoid(8)}`;

  // console.log(url, shortUrl);

  await prisma.redirectLinks.create({
    data: {
      shortUrl: shortUrl,
      redirectTo: url,
    },
  });

  return Response.json({ url: url, shortUrl: shortUrl }, { status: 200 });
}
