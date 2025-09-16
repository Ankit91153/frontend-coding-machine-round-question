"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const sidebarList = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/step-form",
    label: "Step Form",
  },
];
const SideBar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5">
      {sidebarList?.length > 0 &&
        sidebarList.map(({ link, label }) => {
          const activeUrl = link === pathname;
          return (
            <Link
              href={link}
              key={label}
              className={` px-4 py-2 rounded-3xl w-full ${
                activeUrl ? "bg-green-500" : "bg-gray-600"
              }`}
            >
              {label}
            </Link>
          );
        })}
    </div>
  );
};

export default SideBar;
