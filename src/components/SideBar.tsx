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
  {
    link: "/nested-checkbox",
    label: "Nested Checkbox",
  },
  {
    link: "/accordion",
    label: "Accordion",
  },
  {
    link: "/todo",
    label: "Todo",
  },
  {
    link: "/searchable&FilterableList",
    label: "Searchable&FilterableList",
  },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center w-60 p-5 gap-3 bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg rounded-xl h-screen">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">📂 Menu</h2>
      {sidebarList?.length > 0 &&
        sidebarList.map(({ link, label }) => {
          const activeUrl = link === pathname;
          return (
            <Link
              href={link}
              key={label}
              className={`flex items-center justify-center px-4 py-3 w-full rounded-2xl font-medium text-gray-100 transition-all duration-300
                ${
                  activeUrl
                    ? "bg-green-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-600 hover:bg-gray-700 hover:scale-105"
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
