import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const shortUrl = req.nextUrl.host + req.nextUrl.pathname;

  const redirectObject = await prisma.redirectLinks.findUnique({
    where: { shortUrl: shortUrl },
  });

  if (!redirectObject) return new Response("not found", { status: 404 });

  if (redirectObject.expiresAt && redirectObject.expiresAt < new Date())
    return new Response("url expired", { status: 404 });

  if (!redirectObject.enabled)
    return new Response("url disabled", { status: 404 });

  redirectObject.hits += 1;

  await prisma.redirectLinks.update({
    where: { id: redirectObject.id },
    data: { hits: redirectObject.hits },
  });

  redirect(redirectObject.redirectTo);
}

export async function DELETE(req: NextRequest) {
  const { urlId } = await req.json();
  const session = await auth();

  if (!session) return new Response("not logged in", { status: 401 });

  const urlToDelete = await prisma.redirectLinks.findUnique({
    where: { id: urlId },
    include: { owner: true },
  });

  if (!urlToDelete) return new Response("not found", { status: 404 });

  if (urlToDelete.owner?.id !== session.user?.id)
    return new Response("not authorized", { status: 401 });

  await prisma.redirectLinks.delete({
    where: { id: urlToDelete.id },
  });

  return new Response("deleted", { status: 200 });
}

export async function PATCH(req: NextRequest) {
  const { urlId } = await req.json();
  const session = await auth();

  if (!session) return new Response("not logged in", { status: 401 });

  const urlToUpdate = await prisma.redirectLinks.findUnique({
    where: { id: urlId },
  });

  if (!urlToUpdate) return new Response("not found", { status: 404 });
  if (urlToUpdate.ownerId !== session.user?.id) {
    return new Response("not authorized", { status: 401 });
  }

  const res = await prisma.redirectLinks.update({
    where: { id: urlToUpdate.id },
    data: { enabled: !urlToUpdate.enabled },
  });

  return new Response("Enabled status updated", { status: 200 });
}
