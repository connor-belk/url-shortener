import { auth } from "@/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import UrlDashboard from "./_components/UrlDashboard";

export const revalidate = 10;

const Dashboard = async () => {
  const session = await auth();
  if (!session)
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 max-h-screen my-auto w-[80%] max-w-[600px] mx-auto">
        <span className="text-xl font-bold">ERROR 401: Unauthorized!</span> You
        must be logged in to access this page.
        <Link href={"/"} className="hover:underline italic">
          Return to homepage
        </Link>
      </div>
    );

  const urls = await prisma.redirectLinks.findMany({
    where: { ownerId: session.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 max-h-screen my-auto mx-3">
      <h2 className="text-xl text-center mt-3">
        Manage your links here, <span>{session?.user?.name}</span>.
      </h2>
      <div className="lg:block">
        <UrlDashboard userUrls={urls} />
      </div>

      {/* <div className="lg-hidden flex flex-col text-center items-center justify-center gap-5 mt-10">
        <p>
          Your URL table is hidden while not on a large screen due to ongoing
          optimization problems. We apologize for the inconvenience.
        </p>
        <p>A fix is in the works, please be patient while we work on it.</p>
        <Link href={"/"} className="underline">
          Back Home
        </Link>
      </div> */}
    </div>
  );
};

export default Dashboard;
