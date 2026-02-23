import type {
  ElementNode,
  StyleKey,
  StyleTokens,
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

  console.log(styles, "styles");
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
    if (typeof value === "string" && map.prefix === "flex") {
      result.push(`flex ${map.prefix}-${value}`);
      continue;
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

export function tailwindToTokens(className: string): StyleTokens {
  const tokens = className.split(/\s+/).filter(Boolean);
  const out: StyleTokens = {};

  for (const t of tokens) {
    if (t === "flex") {
      out.layout ??= {};
      out.layout.display = "flex";
      continue;
    }

    if (t === "flex-row") {
      out.layout ??= {};
      out.layout.direction = "row";
      continue;
    }

    if (t === "flex-col") {
      out.layout ??= {};
      out.layout.direction = "column";
      continue;
    }

    if (t.startsWith("justify-")) {
      out.layout ??= {};
      out.layout.justify = t.replace("justify-", "") as any;
      continue;
    }

    if (t.startsWith("items-")) {
      out.layout ??= {};
      out.layout.align = t.replace("items-", "") as any;
      continue;
    }

    if (t.startsWith("p-")) {
      out.spacing ??= {};
      out.spacing.p = Number(t.replace("p-", ""));
      continue;
    }

    if (t.startsWith("m-")) {
      out.spacing ??= {};
      out.spacing.m = Number(t.replace("m-", ""));
      continue;
    }

    if (t.startsWith("w-[")) {
      out.size ??= {};
      out.size.w = t.slice(3, -1);
      continue;
    }

    if (t.startsWith("h-[")) {
      out.size ??= {};
      out.size.h = t.slice(3, -1);
      continue;
    }

    if (t.startsWith("bg-[")) {
      out.color ??= {};
      out.color.bg = t.slice(4, -1);
      continue;
    }
  }

  return out;
}

export function tokensToTailwind(tokens: StyleTokens): string {
  const out: string[] = [];

  if (tokens.layout?.display === "flex") {
    out.push("flex");

    if (tokens.layout.direction === "row") out.push("flex-row");
    if (tokens.layout.direction === "column") out.push("flex-col");

    if (tokens.layout.justify) out.push(`justify-${tokens.layout.justify}`);

    if (tokens.layout.align) out.push(`items-${tokens.layout.align}`);
  }

  if (tokens.spacing?.p) out.push(`p-${tokens.spacing.p}`);

  if (tokens.spacing?.m) out.push(`m-${tokens.spacing.m}`);

  if (tokens.size?.w) out.push(`w-[${tokens.size.w}]`);

  if (tokens.size?.h) out.push(`h-[${tokens.size.h}]`);

  if (tokens.color?.bg) out.push(`bg-[${tokens.color.bg}]`);

  return out.join(" ");
}
