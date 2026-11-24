import React from "react";

export default function PlayIcon({ className = "w-7 h-7 sm:w-8 sm:h-8 md:w-11 md:h-11" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} translate-x-[2px]`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
      />
    </svg>
  );
}
