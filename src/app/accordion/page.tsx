"use client";
import React, { useState } from "react";

interface IItem {
  title: string;
  content: string;
}
    
const items: IItem[] = [
  {
    title: "JavaScript Basics",
    content: "Learn variables, functions, and loops in JavaScript.",
  },
  {
    title: "React.js Overview",
    content: "Understand components, state, and props in React.",
  },
  {
    title: "Node.js",
    content: "Basics of server-side development with Node.js.",
  },
  {
    title: "Full-Stack Development",
    content: "Build full-stack apps with React and Node.js.",
  },
];

const Accordion = () => {
  const [showArray, setShowArray] = useState<Boolean[]>(new Array(items.length).fill(false));

  const clickHandler = (i: number) => {
    setShowArray((prev) => prev.map((ele: Boolean, idx) => (idx === i ? !ele : false)));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg divide-y divide-gray-200">
      {items.length > 0 &&
        items.map((item: IItem, index) => {
          const isShow = showArray[index];
          return (
            <div key={index} className="p-4 transition-all duration-300 hover:bg-gray-50">
              {/* Title section */}
              <div
                onClick={() => clickHandler(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {item.title}
                </span>
                <span className="text-gray-500 text-xl">
                  {isShow ? "▾" : "▸"}
                </span>
              </div>

              {/* Content section */}
              {isShow && (
                <p className="mt-3 text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-3">
                  {item.content}
                </p>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Accordion;
