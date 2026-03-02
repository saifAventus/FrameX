import { twMerge } from "tailwind-merge";
import type {
  ElementNode,
  TGlobalElementProps,
} from "../shared/types/elementNode";

export interface LayoutForm {
  p?: string;
  m?: string;
  flexDirection?: "row" | "column";
  // justifyContent?: string;
  // alignItems?: string;
  w?: string;
  h?: string;
  bg?: string;
  border?: string;
  textAlign?: "left" | "center" | "right";
  fontWeight?:
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  color?: string;
  // backgroundColor?: string;
}

const sizeApplyingElements = ["p", "m", "w", "h"];

const textAlignElements = ["left", "center", "right"];
const fontSize = ["sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"];

export const handleStringConversion = (
  data: TGlobalElementProps,
  classname: string,
) => {
  const utilities: string[] = [];

  for (const key in data) {
    const value = data[key as keyof TGlobalElementProps];

    if (value === undefined || value === "") continue;

    if (
      typeof value === "string" &&
      (value.includes("[") || value.includes("#")) &&
      key !== "color"
    ) {
      utilities.push(`${key}-[${value}]`);
    } else if (key === "color") {
      utilities.push(`text-[${value}]`);
    } else if (key === "flexDirection") {
      utilities.push(`flex ${value}`);
    } else if (key === "justify") {
      utilities.push(`justify-${value}`);
    } else if (key === "align") {
      console.log("the align is ", key, value);
      utilities.push(`items-${value}`);
    } else if (
      typeof value === "string" &&
      sizeApplyingElements.includes(key)
    ) {
      const match = value.trim().match(/^(-?\d*\.?\d+)(px|rem|%|em|vh|vw)$/);

      if (match) {
        utilities.push(`${key}-[${value}]`);
      }
    } else if (textAlignElements.includes(value as string)) {
      utilities.push(`text-${value}`);
    } else if (fontSize.includes(value as string)) {
      utilities.push(`text-${value}`);
    } else {
      console.log("the else is ", key, value);
      utilities.push(`${key}-${value}`);
    }
  }
  return twMerge(classname, ...utilities);
};

export const parseTailwindToForm = (className: string) => {
  const form: LayoutForm = {};

  const tokens = className.split(/\s+/);

  for (const t of tokens) {
    if (t.startsWith("p-")) form.p = t.slice(t.indexOf("-") + 1);
    if (t.startsWith("m-")) form.m = t.slice(t.indexOf("-") + 1);
    if (t.startsWith("w-")) form.w = t.slice(t.indexOf("-") + 1);
    if (t.startsWith("h-")) form.h = t.slice(t.indexOf("-") + 1);
    if (t.startsWith("bg-")) {
      form.bg = t.slice(2).replace("[", "").replace("]", "").replace(/^-/, "");
    }
    if (t.startsWith("border-") && t.includes("[")) {
      form.border = t
        .slice(t.indexOf("-") + 1)
        .replace("[", "")
        .replace("]", "")
        .replace(/^-/, "");
    }
    if (t.startsWith("flex-")) {
      form.flexDirection = t as "row" | "column";
    }
    if (textAlignElements.includes(t)) {
      form.textAlign = t as "left" | "center" | "right";
    }
    if (fontSize.includes(t)) {
      form.fontWeight = t as
        | "sm"
        | "base"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl"
        | "6xl";
    }
    if (t.startsWith("text-") && t.includes("[")) {
      form.color = t
        .slice(t.indexOf("-") + 1)
        .replace("[", "")
        .replace("]", "")
        .replace(/^-/, "");
    }
  }

  return form;
};

export const breakValue = (input: string | number) => {
  const match = String(input)
    .trim()
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .match(/^(-?\d*\.?\d+)([a-zA-Z%]+)?$/);
  if (!match) {
    return { value: "", unit: "px" };
  }

  return {
    value: match[1] ?? "",
    unit: match[2] ?? "px",
  };
};

export const getChildren = (node: ElementNode): ElementNode[] =>
  node.layout || node.children || node.render || [];

export const getDisplayName = (node: ElementNode) =>
  node.name || node.element || "Unknown";

export const resolveRef = (
  ref: string | undefined,
  definitions?: Record<string, unknown>,
): ElementNode | null => {
  if (!ref || !definitions) return null;

  return (
    ref
      .replace("#/definitions/", "")
      .split("/")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce<any>((acc, key) => acc?.[key], definitions) ?? null
  );
};

export function createNode(element: string): ElementNode {
  return {
    id: crypto.randomUUID(),
    element,
    props: {
      className: "p-4 border border-dashed border-gray-400",
    },
    children: [],
  };
}
