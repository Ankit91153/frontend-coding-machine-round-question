"use client";
import React, { useRef } from "react";

const NestedScroll = () => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const inner = innerRef.current;
    if (!inner) return;

    const { scrollTop, scrollHeight, clientHeight } = inner;

    const isScrollingDown = e.deltaY > 0;
    const isScrollingUp = e.deltaY < 0;

    const atBottom = scrollTop + clientHeight >= scrollHeight;
    const atTop = scrollTop <= 0;

    if ((isScrollingDown && !atBottom) || (isScrollingUp && !atTop)) {
      e.stopPropagation();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      
      {/* Outer Card */}
      <div
        ref={outerRef}
        className="w-[60%] max-h-[600px] overflow-auto rounded-2xl shadow-2xl backdrop-blur-lg bg-white/60 border border-white/40 p-6"
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Outer Scroll Container
        </h1>

        {/* Top spacing content */}
        <div className="space-y-2 mb-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="text-gray-600">
              Outer Item {i}
            </p>
          ))}
        </div>

        {/* Inner Card */}
        <div
          ref={innerRef}
          onWheel={handleWheel}
          className="h-[250px] overflow-auto rounded-xl bg-white shadow-inner border border-gray-200 p-4 mb-6"
        >
          <h2 className="font-semibold text-gray-700 mb-3">
            Inner Scroll Area
          </h2>

          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="p-2 mb-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition"
            >
              Inner Item {i}
            </div>
          ))}
        </div>

        {/* Bottom content */}
        <div className="space-y-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="text-gray-600">
              Outer Bottom Item {i}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NestedScroll;