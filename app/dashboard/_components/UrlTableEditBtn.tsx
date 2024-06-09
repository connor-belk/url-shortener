"use client";

import toast, { Toaster } from "react-hot-toast";

const handleEnableDisable = async (url: any) => {
  // throw new Error("Function not implemented.");
  const res = await fetch(`/api/${url.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      urlId: url.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    console.log("URL updated successfully"); // TODO: add success toast
  } else {
    console.log("Error updating URL"); // TODO: add error toast
  }
};

const UrlTableEditBtn = ({ url }: { url: any }) => {
  if (!url) return null;

  // toast.promise(handleEnableDisable(url), {
  //   loading: "Updating URL...",
  //   success: "URL updated successfully",
  //   error: "Error updating URL",
  // });

  return (
    <div
      className="hover:cursor-pointer hover:underline"
      onClick={() =>
        toast.promise(handleEnableDisable(url), {
          loading: "Updating URL...",
          success: `URL updated successfully`,
          error: "Error updating URL",
        })
      }
    >
      {url.enabled ? "Disable" : "Enable"}
      <Toaster />
    </div>
  );
};

export default UrlTableEditBtn;
