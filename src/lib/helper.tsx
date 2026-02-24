import { twMerge } from "tailwind-merge";
import type {
  ElementNode,
  StyleKey,
  TGlobalElementProps,
} from "../shared/types/elementNode";
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

  const tokens = className.split(/\s+/).filter(Boolean);

  for (const token of tokens) {
    const clean = token.split(":").pop()!;

    for (const map of TAILWIND_MAP) {
      if (!clean.startsWith(map.prefix + "-")) continue;

      let raw = clean.slice(map.prefix.length + 1);

      if (raw.startsWith("[")) {
        raw = raw.slice(1, -1);
      }

      if (map.key === "textAlign") {
        styles.textAlign = raw as never;
        continue;
      }

      const numeric = Number(raw);
      styles[map.key] = isNaN(numeric) ? raw : numeric;
    }
  }

  return styles;
}

export function resolveStyles(
  styles: Partial<Record<StyleKey, string | number>>,
) {
  const inline: React.CSSProperties = {};

  for (const [key, value] of Object.entries(styles)) {
    if (value == null) continue;

    const map = TAILWIND_MAP.find((m) => m.key === key);
    if (!map) continue;
    if (map.key === "backgroundColor") {
      inline[key as any] = value;
      continue;
    }
    if (map.key === "width") {
      inline[key as any] = value;
      continue;
    }
    if (map.key === "height") {
      inline[key as any] = value;
      continue;
    }
    inline[key as any] = value;
  }

  return {
    style: inline,
  };
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

  if (node.render) {
    node.render = node.render.map(attachIds);
  }

  return node;
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

// export function insertNodeInside(
//   tree: ElementNode,
//   parentId: string,
//   newNode: ElementNode,
// ): ElementNode {
//   if (tree.id === parentId && tree.id === "root") {
//     return {
//       ...tree,
//       layout: [...(tree.layout || []), newNode],
//     };
//   }

//   if (tree.id === parentId) {
//     return {
//       ...tree,
//       children: [...(tree.children || []), newNode],
//     };
//   }

//   return {
//     ...tree,
//     layout: tree.layout?.map((n) => insertNodeInside(n, parentId, newNode)),
//     children: tree.children?.map((n) => insertNodeInside(n, parentId, newNode)),
//   };
// }

export function updateNodeID(
  nodes: ElementNode[],
  id: string,
  updatedData: string,
  updatedType: "className" | "text",
): ElementNode[] {
  return nodes.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        props: {
          ...node.props,
          [updatedType]: updatedData,
        },
      };
    }

    if (node.children?.length) {
      return {
        ...node,
        children: updateNodeID(node.children, id, updatedData, updatedType),
      };
    }

    return node;
  });
}

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
      (value.includes("[") || value.includes("#"))
    ) {
      utilities.push(`${key}-[${value}]`);
    } else if (key === "flexDirection") {
      utilities.push(`flex ${value}`);
    } else {
      utilities.push(`${key}-${value}`);
    }
  }

  return twMerge(classname, ...utilities);
};

export interface LayoutForm {
  p?: number;
  m?: number;
  // flexDirection?: "row" | "column";
  // justifyContent?: string;
  // alignItems?: string;
  w?: string;
  h?: string;
  // backgroundColor?: string;
}

export const parseTailwindToForm = (className: string) => {
  const form: LayoutForm = {};

  const tokens = className.split(/\s+/);

  for (const t of tokens) {
    if (t.startsWith("p-")) form.p = Number(t.slice(2));
    if (t.startsWith("m-")) form.m = Number(t.slice(2));

    if (t.startsWith("w-")) form.w = t.slice(2);
    if (t.startsWith("h-")) form.h = t.slice(2);
  }

  return form;
};
