import type { ElementNode, StyleKey } from "../shared/types/elementNode";
import { TAILWIND_MAP } from "./utils";

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

export function tailwindToStyleObject(
  className: string,
): Partial<Record<StyleKey, string | number>> {
  const styles: Partial<Record<StyleKey, string | number>> = {};

  const tokens = className.split(" ").filter(Boolean);

  for (const token of tokens) {
    const [prefix, rawValue] = token.split("-");

    const map = TAILWIND_MAP.find((m) => m.prefix === prefix);
    if (!map || !rawValue) continue;

    if (map.key.startsWith("text")) {
      console.log(rawValue, "string");
      styles[map.key] = rawValue;
    } else {
      console.log(rawValue, "number");
      const value = Number(rawValue);
      if (!isNaN(value)) styles[map.key] = value;
    }
  }

  return styles;
}

// export function styleObjectToTailwind(
//   styles: Partial<Record<StyleKey, string | number>>,
// ): string {
//   return Object.entries(styles)
//     .map(([key, value]) => {
//       const map = TAILWIND_MAP.find((m) => m.key === key);
//       if (!map) return "";

//       if (typeof value === "number") {
//         return `${map.prefix}-${value}`;
//       }

//       return `${map.prefix}-${value}`;
//     })
//     .filter(Boolean)
//     .join(" ");
// }

export function mergeTailwindClasses(
  existing: string,
  updates: Partial<Record<StyleKey, string | number>>,
) {
  const tokens = existing.split(/\s+/).filter(Boolean);
  const result = [...tokens];

  for (const [key, value] of Object.entries(updates)) {
    if (value == null) continue;

    const map = TAILWIND_MAP.find((m) => m.key === key);
    if (!map) continue;

    const prefix = map.prefix + "-";

    for (let i = result.length - 1; i >= 0; i--) {
      const base = result[i].split(":").pop()!;
      if (base.startsWith(prefix)) {
        result.splice(i, 1);
      }
    }

    result.push(`${map.prefix}-${value}`);
  }

  return result.join(" ");
}
