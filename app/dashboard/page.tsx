import { auth } from "@/auth";
import Link from "next/link";
import UrlTable from "./_components/UrlTable";

const Dashboard = async () => {
  const session = await auth();
  if (!session)
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 max-h-screen my-auto w-[80%] max-w-[600px] mx-auto">
        You must be logged in to access this page.
        <Link href={"/"} className="hover:underline italic">
          Return to homepage
        </Link>
      </div>
    );

  return (
    <div className="flex-1 max-h-screen my-auto mx-10">
      <h2 className="text-3xl mt-3">
        Manage your links here, <span>{session?.user?.name}</span>.
      </h2>
      <UrlTable />
    </div>
  );
};

export default Dashboard;
