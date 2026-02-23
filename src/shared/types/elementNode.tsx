import type GlobalStyleScheme from "@/schema/elemetSchema/globalElemetSchema";
import type z from "zod";

export interface IElementProps {
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
  | "backgroundColor"
  | "color"
  | "fontSize"
  | "fontWeight"
  | "width"
  | "height"
  | "borderRadius"
  | "borderWidth"
  | "flexDirection"
  | "justifyContent"
  | "alignItems"
  | "display"
  | "coloum";

export type TailwindMapping = {
  key: StyleKey;
  prefix: string;
  transform?: (value: string) => number | string;
};
export type TGlobalElementProps = z.infer<typeof GlobalStyleScheme>;
export interface IGlobalElementProps {
  data: string;
  onChange: (data: TGlobalElementProps) => void;
  name: string;
  text?: string;
  as?: string;
}

export interface StyleTokens {
  layout?: {
    display?: "flex" | "block";
    direction?: "row" | "column";
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
    align?: "start" | "center" | "end" | "stretch";
  };
  spacing?: {
    p?: number;
    m?: number;
  };
  size?: {
    w?: string;
    h?: string;
  };
  color?: {
    bg?: string;
  };
}
