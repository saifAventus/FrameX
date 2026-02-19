import type { TailwindMapping } from "@/shared/types/elementNode";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Image, Square, Text } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const TAILWIND_REGEX =
  /\b(bg-|text-|p-|px-|py-|m-|flex|grid|w-|h-|rounded|border|shadow|hover:|items-|justify-|gap-|font-|line-clamp-|overflow-|transition|duration-)\b/;

export const CSS_VALUE_REGEX =
  /(#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|\d+(px|rem|em|%)|auto|absolute|relative|fixed)/;

export const TAILWIND_MAP: TailwindMapping[] = [
  { key: "padding", prefix: "p" },
  { key: "paddingTop", prefix: "pt" },
  { key: "paddingBottom", prefix: "pb" },
  { key: "paddingLeft", prefix: "pl" },
  { key: "paddingRight", prefix: "pr" },
  { key: "paddingX", prefix: "px" },
  { key: "paddingY", prefix: "py" },
  { key: "margin", prefix: "m" },
  { key: "textAlign", prefix: "text" },
  { key: "backgroundColor", prefix: "bg" },
];

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
    excludeDropDown: false,
  },
];
