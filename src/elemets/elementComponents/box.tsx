import React from "react";
import { twj } from "tw-to-css";

export interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Box({ children, className = "" }: BoxProps) {
  // Generate inline styles from tailwind strings to synchronize editor and renderer
  const styleInline = twj(`${className}`);

  // A box is considered empty if no valid React children exist.
  // This helps prevent empty containers from collapsing to 0 height/width in the editor.
  const isEmpty = React.Children.count(children) === 0;

  return (
    <div
      className={`relative group transition-all duration-200 ease-in-out ${
        isEmpty
          ? "flex flex-col items-center justify-center min-h-[80px] min-w-[80px] w-full border-2 border-dashed border-gray-300 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer rounded-md"
          : "border border-transparent hover:border-blue-400/50 hover:shadow-sm"
      } ${className}`}
      style={styleInline}
    >
      {isEmpty && (
        <div className="flex flex-col items-center justify-center gap-2 pointer-events-none select-none opacity-50 group-hover:opacity-100 transition-opacity p-4">
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600 transition-colors text-center">
            Empty Container
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
