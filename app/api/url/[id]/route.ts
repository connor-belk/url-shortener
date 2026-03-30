import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return new Response("not logged in", { status: 401 });

  const { id } = await params;

  const url = await prisma.redirectLinks.findUnique({
    where: { id },
  });

  if (!url) return new Response("not found", { status: 404 });
  if (url.ownerId !== session.user?.id)
    return new Response("not authorized", { status: 401 });

  return new Response(JSON.stringify(url));
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return new Response("not logged in", { status: 401 });

  const { id } = await params;

  const url = await prisma.redirectLinks.findUnique({
    where: { id },
  });

  if (!url) return new Response("not found", { status: 404 });
  if (!url.ownerId) return new Response("not authorized", { status: 401 });
  if (url.ownerId !== session.user?.id)
    return new Response("not authorized", { status: 401 });

  const { nickname, shortUrl, expiresAt } = await req.json();

  if (shortUrl.length < 7) return new Response("too short", { status: 400 });
  if (shortUrl.length > 14) return new Response("too long", { status: 400 });

  const host = new URL(req.url).host;
  const fullShortUrl = `${host}/api/${shortUrl}`;

  const updated = await prisma.redirectLinks.update({
    where: { id },
    data: {
      nickname,
      shortUrl: fullShortUrl,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  return new Response(JSON.stringify(updated));
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth();

  if (!session || !session.user || !session.user.id)
    return new NextResponse("not logged in", { status: 401 });

  const urlToDelete = await prisma.redirectLinks.findUnique({
    where: { id },
  });

  if (!urlToDelete) return new NextResponse("not found", { status: 404 });

  if (urlToDelete.ownerId !== session.user.id) {
    return new NextResponse("not authorized", { status: 401 });
  }

  await prisma.redirectLinks.delete({
    where: { id: urlToDelete.id },
  });

  return new NextResponse("deleted", {
    status: 200,
  });
}
