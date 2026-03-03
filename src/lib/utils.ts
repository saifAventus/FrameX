import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Image, Square, SquareMenu, Text } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const elementLibrary = [
  {
    label: "Box",
    value: "Box",
    icon: Square,
    excludeDropDown: false,
  },
  {
    label: "Text",
    value: "Text",
    icon: Text,
    excludeDropDown: true,
  },
  {
    label: "Image",
    value: "Image",
    icon: Image,
    excludeDropDown: true,
  },
  {
    label: "Navbar",
    value: "Navbar",
    icon: SquareMenu,
    excludeDropDown: true,
  },
];
