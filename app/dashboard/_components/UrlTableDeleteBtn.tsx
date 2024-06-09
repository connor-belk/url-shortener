"use client";

import toast, { Toaster } from "react-hot-toast";

const deleteUrl = async (urlId: string) => {
  const res = await fetch(`/api/${urlId}`, {
    method: "DELETE",
    body: JSON.stringify({
      urlId: urlId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    console.log("URL deleted successfully");
  } else {
    console.log("Error deleting URL");
  }
};

const UrlTableDeleteBtn = ({ url }: { url: string }) => {
  return (
    <div
      className="hover:cursor-pointer hover:underline"
      onClick={() =>
        toast.promise(deleteUrl(url), {
          loading: "Deleting URL...",
          success: `URL deleted successfully`,
          error: "Error deleting URL",
        })
      }
    >
      Delete
      <Toaster />
    </div>
  );
};

export default UrlTableDeleteBtn;
