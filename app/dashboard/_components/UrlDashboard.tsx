import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import UrlTile from "./UrlTile";

export default async function UrlDashboard({ userUrls }: { userUrls: any }) {
  const session = await auth();
  if (!session) return null;

  return (
    <div className="mt-4">
      <h2 className="text-center">Your URLs:</h2>
      <ul className="mt-5 grid grid-cols-1 gap-5 justify-center items-center">
        {userUrls.map((url: any) => (
          <UrlTile
            key={url.id}
            id={url.id}
            title={""}
            url={url.shortUrl}
            hits={url.hits}
            enabled={url.enabled}
          />
        ))}
      </ul>
    </div>
  );
}
