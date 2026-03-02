import * as z from "zod";

const GlobalStyleScheme = z.object({
  p: z.union([z.number(), z.string()]).optional(),
  m: z.union([z.number(), z.string()]).optional(),
  b: z.union([z.number(), z.string()]).optional(),
  h: z.union([z.number(), z.string()]).optional(),
  w: z.union([z.number(), z.string()]).optional(),
  radious: z.union([z.number(), z.string()]).optional(),
  flex: z.union([z.number(), z.string()]).optional(),
  justify: z.union([z.number(), z.string()]).optional(),
  align: z.union([z.number(), z.string()]).optional(),
  bg: z.union([z.number(), z.string()]).optional(),
  text: z.union([z.number(), z.string()]).optional(),
  border: z.union([z.number(), z.string()]).optional(),
  flexDirection: z.union([z.number(), z.string()]).optional(),
  textAlign: z.union([z.number(), z.string()]).optional(),
  fontWeight: z.string().optional(),
});
export default GlobalStyleScheme;

// import z from "zod";

// const GlobalStyleSchema = z.object({
//   padding: z.number().optional(),
//   margin: z.number().optional(),

//   width: z
//     .string()
//     .regex(/^\d+(px|%|rem|vw|vh)$/)
//     .optional(),
//   height: z
//     .string()
//     .regex(/^\d+(px|%|rem|vw|vh)$/)
//     .optional(),

//   backgroundColor: z.string().optional(),

//   fontSize: z.enum(["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]).optional(),
//   fontWeight: z
//     .enum(["thin", "light", "normal", "medium", "semibold", "bold"])
//     .optional(),

//   textAlign: z.enum(["left", "center", "right", "justify"]).optional(),

//   flexDirection: z.enum(["row", "column"]).optional(),
//   justifyContent: z
//     .enum(["start", "center", "end", "between", "around", "evenly"])
//     .optional(),

//   alignItems: z.enum(["start", "center", "end", "stretch"]).optional(),

//   borderRadius: z.number().optional(),
//   border: z.number().optional(),

//   as: z.enum(["div", "span", "p", "section", "article"]).optional(),
//   text: z.string().optional(),
// });
// export default GlobalStyleSchema;
