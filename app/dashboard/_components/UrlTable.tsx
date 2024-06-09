import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import UrlTableEditBtn from "./UrlTableEditBtn";
import UrlTableDeleteBtn from "./UrlTableDeleteBtn";
import Link from "next/link";

export const revalidate = 10;

const UrlTable = async () => {
  const session = await auth();
  if (!session) return null;

  const getUserUrls = async () => {
    let userUrls = await prisma.redirectLinks.findMany({
      where: { ownerId: session.user?.id },
      orderBy: { createdAt: "desc" },
    });

    return userUrls;
  };

  let userUrls = await prisma.redirectLinks.findMany({
    where: { ownerId: session.user?.id },
    orderBy: { createdAt: "desc" },
  });

  //   #TODO: add delete logic                #DONE
  //   #TODO: add delete functionality        #DONE
  //   #TODO: add edit logic                  #DONE
  //   #TODO: add edit functionality
  //   #TODO: add table refresh functionality

  return (
    <table className="border w-full my-3">
      {/* <form onSubmit={refreshUrlTableData}>
        <button type="submit">Refresh</button>
      </form> */}
      <thead className="border-b">
        <tr className="text-center bg-slate-900">
          <th className="border-l border-r py-1 ">#</th>
          <th className="border-l border-r">Short URL</th>
          <th className="border-l border-r">Long URL</th>
          <th className="border-l border-r">Hits</th>
          <th className="border-l border-r">Actions</th>
        </tr>
      </thead>
      <tbody>
        {userUrls.map((url, index) => (
          <tr
            key={url.id}
            className="text-center border-b hover:bg-gray-800 transition-colors duration-150"
          >
            <td className="border-l border-r w-[2rem]">{index + 1}</td>
            <td className="border-l border-r">{url.shortUrl}</td>
            <td className="border-l border-r w-[35rem]">{url.redirectTo}</td>
            <td className="border-l border-r w-[3rem]">{url.hits}</td>
            <td className="border-l border-r w-[7rem]">
              <UrlTableEditBtn url={url} />
              <UrlTableDeleteBtn url={url.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// export async function getStaticProps() {
//   const session = await auth();
//   if (!session) return null;
//   const res = prisma.redirectLinks.findMany({
//     where: { ownerId: session.user?.id },
//     orderBy: { createdAt: "desc" },
//   });

//   return {
//     props: {
//       userUrls: res,
//     },
//     revalidate: 30,
//   };
// }

export default UrlTable;
