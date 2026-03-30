"use client";

import Link from "next/link";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  nickname: string;
  url: string;
  hits: number;
  enabled: boolean;
};

export const revalidate = 60;

const UrlTile = (props: Props) => {
  const [enabled, setEnabled] = useState(props.enabled);
  const router = useRouter();

  const toggleEnabled = async () => {
    const res = await fetch(`/api/${props.id}`, {
      method: "PATCH",
      body: JSON.stringify({ urlId: props.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    switch (res.status) {
      case 200:
        setEnabled(!enabled);
        console.log("link updated successfully.");
        break;
      case 401:
        alert("You must be logged in to enable/disable this URL.");
        break;
      default:
        alert("Something went wrong. Please try again.");
        break;
    }
  };

  const handleDelete = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const deleteUrl = props.id;

    if (!confirm("Are you sure you want to delete this URL?")) return;

    e.preventDefault();

    const res = await fetch(`/api/url/${deleteUrl}`, {
      method: "DELETE",
      body: JSON.stringify({ urlId: props.id }),
      headers: {
        ContentType: "application/json",
      },
    }).then((res) => {
      switch (res.status) {
        case 200:
          console.log("Link deleted successfully.");
          router.refresh();
          break;
        case 401:
          alert("You must be logged in to delete this URL.");
          break;
        default:
          alert("Something went wrong. Please try again.");
          break;
      }
    });
  };

  return (
    <Link href={`/dashboard/url/${props.id}`}>
      <div className="grid grid-cols-[1fr_auto] border border-slate-800 px-3 py-2 rounded-xl shadow-md shadow-slate-600 max-w-[50rem] w-full mx-auto transition-transform duration-150">
        {props.nickname ? (
          <h3 className="text-xl">{props.nickname}</h3>
        ) : (
          <h3 className="text-lg">{props.url}</h3>
        )}
        <p className="col-start-2 justify-self-end">Hits: {props.hits}</p>
        {/* <p>{enabled ? "🟢" : "🔴"}</p> */}
        <Switch
          checked={enabled}
          onClick={(e) => {
            // prevent the Link navigation
            e.preventDefault();
            e.stopPropagation();
            toggleEnabled();
          }}
          className={({ checked }) =>
            [
              "relative inline-flex h-6 w-12 cursor-pointer rounded-full p-1",
              "transition-colors duration-200 ease-in-out",
              checked ? "bg-[#5dcf94]" : "bg-white/10",
              "focus:outline-none focus:none focus:none",
            ].join(" ")
          }
        >
          <span
            aria-hidden="true"
            className={[
              "inline-block size-4 rounded-full shadow-lg bg-gray-200",
              "transform transition-transform duration-200 ease-in-out", // <- this is the animation
              enabled ? "translate-x-6 bg-gray-800" : "translate-x-0",
            ].join(" ")}
          />
        </Switch>
        {/* <p className="">{enabled ? "Enabled" : "Disabled"}</p> */}
        <IoTrashBin
          className="self-end place-self-end text-xl text-red-500 hover:scale-105"
          onClick={(e) => handleDelete(e)}
        />
      </div>
    </Link>
  );
};

export default UrlTile;
