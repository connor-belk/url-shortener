import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { url } = await req.json();
  const shortUrl = `${process.env.HOSTNAME}/${nanoid(8)}`;

  // console.log(url, shortUrl);

  await prisma.redirectLinks
    .create({
      data: {
        shortUrl: shortUrl,
        redirectTo: url,
      },
    })
    .catch((err: any) => {
      console.log(err);
      return err;
    })
    .then((res: any) => {
      console.log(res);
    })
    .finally(() => {
      console.log("done");
    });

  return Response.json({ url: url, shortUrl: shortUrl }, { status: 200 });
}
