import React from "react";

export default function PlayIcon({ className = "w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} translate-x-[2px]`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 4.5v15a1 1 0 001.53.85l12-7.5a1 1 0 000-1.7l-12-7.5A1 1 0 007 4.5z"
      />
    </svg>
  );
}
