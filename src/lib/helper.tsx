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
      styles[map.key] = rawValue;
    } else {
      const value = Number(rawValue);
      if (!isNaN(value)) styles[map.key] = value;
    }
  }

  return styles;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function attachIds(node: any): ElementNode {
  if (!node.id) {
    node.id = crypto.randomUUID();
  }

  if (node.children) {
    node.children = node.children.map(attachIds);
  }

  if (node.layout) {
    node.layout = node.layout.map(attachIds);
  }

  return node;
}

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
      if (base.startsWith(prefix) || base.startsWith(`${map.prefix}-[`)) {
        result.splice(i, 1);
      }
    }

    if (typeof value === "string" && value.startsWith("#")) {
      result.push(`${map.prefix}-[${value}]`);
      continue;
    }

    if (typeof value === "string" && value.endsWith("px")) {
      result.push(`${map.prefix}-[${value}]`);
      continue;
    }

    result.push(`${map.prefix}-${value}`);
  }

  return result.join(" ");
}

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

export function insertNodeInside(
  tree: ElementNode,
  parentId: string,
  newNode: ElementNode,
): ElementNode {
  if (tree.id === parentId && tree.id === "root") {
    return {
      ...tree,
      layout: [...(tree.layout || []), newNode],
    };
  }

  if (tree.id === parentId) {
    return {
      ...tree,
      children: [...(tree.children || []), newNode],
    };
  }

  return {
    ...tree,
    layout: tree.layout?.map((n) => insertNodeInside(n, parentId, newNode)),
    children: tree.children?.map((n) => insertNodeInside(n, parentId, newNode)),
  };
}
