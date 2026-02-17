import * as z from "zod";

const BoxSchema = z.object({
  padding: z.union([z.number(), z.string()]).optional(),
  margin: z.union([z.number(), z.string()]).optional(),
  border: z.union([z.number(), z.string()]).optional(),
  borderRadius: z.union([z.number(), z.string()]).optional(),
  boxShadow: z.union([z.number(), z.string()]).optional(),
  backgroundColor: z.union([z.number(), z.string()]).optional(),
  color: z.union([z.number(), z.string()]).optional(),
  fontSize: z.union([z.number(), z.string()]).optional(),
  fontWeight: z.union([z.number(), z.string()]).optional(),
  textAlign: z.union([z.number(), z.string()]).optional(),
  width: z.union([z.number(), z.string()]).optional(),
  height: z.union([z.number(), z.string()]).optional(),
  flexDirection: z.union([z.number(), z.string()]).optional(),
  justifyContent: z.union([z.number(), z.string()]).optional(),
  alignItems: z.union([z.number(), z.string()]).optional(),
});
export default BoxSchema;
