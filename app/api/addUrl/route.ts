import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const { url } = await req.json();
  const shortUrl = `${process.env.HOSTNAME}/${nanoid(8)}`;

  return Response.json({ url: url, shortUrl: shortUrl }, { status: 200 });
}
