import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import UrlEditForm from "../../_components/UrlEditForm";
import { notFound, redirect } from "next/navigation";

export default async function LinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/");

  const { id } = await params;

  const url = await prisma.redirectLinks.findUnique({
    where: { id },
  });

  if (!url) notFound();
  if (url.ownerId !== session.user?.id) notFound();

  return (
    <div className="h-full">
      <UrlEditForm url={url} />
    </div>
  );
}
