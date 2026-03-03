import React, { useState, useEffect } from "react";

interface ImgProps {
  imageData?: string;
  className?: string;
  onChange?: (file: File) => void;
}

function Img({ imageData, className, onChange }: ImgProps) {
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(imageData);

  useEffect(() => {
    return () => {
      if (previewSrc && previewSrc.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewSrc(objectUrl);

    if (onChange) {
      onChange(file);
    }

    e.target.value = "";
  };

  const handleRemove = () => {
    setPreviewSrc(undefined);
  };

  return (
    <div className={`flex flex-col w-full ${className || ""}`}>
      {previewSrc ? (
        <div className="relative group w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm transition-all hover:shadow-md">
          <img
            src={previewSrc}
            alt="Uploaded preview"
            className="w-full h-auto object-contain max-h-[300px]"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <button
              onClick={handleRemove}
              className="px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-md shadow-sm hover:bg-red-50 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="button"
            >
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="imageData"
          className="flex flex-col items-center justify-center w-fit border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50/50 hover:border-blue-400 transition-colors group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
        >
          <div className="flex flex-col items-center justify-center p-6 text-gray-400 group-hover:text-blue-500 transition-colors">
            <svg
              className="w-10 h-10 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>

            <p className="text-xs text-gray-500 group-hover:text-blue-500/70 text-center">
              SVG, PNG, JPG or GIF
            </p>
          </div>
          <input
            type="file"
            name="imageData"
            id="imageData"
            accept="image/*"
            onChange={handleChange}
            className="sr-only"
          />
        </label>
      )}
    </div>
  );
}

export default Img;
