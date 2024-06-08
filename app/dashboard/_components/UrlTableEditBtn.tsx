"use client";

const handleEnableDisable = async (url: any) => {
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
    console.log("URL updated successfully");
  } else {
    console.log("Error updating URL");
  }
};

const UrlTableEditBtn = ({ url }: { url: any }) => {
  if (!url) return null;

  return (
    <div
      className="hover:cursor-pointer hover:underline"
      onClick={() => handleEnableDisable(url)}
    >
      {url.enabled ? "Disable" : "Enable"}
    </div>
  );
};

export default UrlTableEditBtn;
