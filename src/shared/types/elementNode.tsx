interface IElementProps {
  className?: string;
  as?: string;
  value?: string;
  messages?: string;
  ref?: string;
  type?: string;
}

export interface ElementNode {
  props?: IElementProps;
  id?: string;
  name?: string;
  element?: string;
  $ref?: string;
  children?: ElementNode[];
  layout?: ElementNode[];
  render?: ElementNode[];
  definitions?: Record<string, unknown>;
}

export type StyleKey =
  | "padding"
  | "paddingTop"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingX"
  | "paddingY"
  | "margin"
  | "textAlign"
  | "backgroundColor";

export type TailwindMapping = {
  key: StyleKey;
  prefix: string;
  transform?: (value: string) => number | string;
};
