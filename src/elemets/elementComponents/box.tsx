import { resolveStyles, tailwindToStyleObject } from "@/lib/helper";

export default function Box({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { style } = resolveStyles(tailwindToStyleObject(className!));

  console.log(style, "style", className);

  return <div className={`${className} border`}>{children}</div>;
}
