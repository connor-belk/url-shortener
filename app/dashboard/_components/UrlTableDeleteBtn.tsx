"use client";

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
      onClick={() => deleteUrl(url)}
    >
      Delete
    </div>
  );
};

export default UrlTableDeleteBtn;
