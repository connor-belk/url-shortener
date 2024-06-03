import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const shortUrl = req.nextUrl.host + req.nextUrl.pathname;

  const redirectObject = await prisma.redirectLinks.findUnique({
    where: {
      shortUrl: shortUrl,
    },
  });

  if (!redirectObject) {
    return new Response("not found", { status: 404 });
  }

  redirect(redirectObject.redirectTo);
}
