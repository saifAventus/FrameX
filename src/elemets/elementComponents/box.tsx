import { resolveStyles, tailwindToStyleObject } from "@/lib/helper";

export default function Box({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { customClassName, style } = resolveStyles(
    tailwindToStyleObject(className!),
  );

  console.log(customClassName, "customClassName");

  return (
    <div className={`${customClassName} border`} style={style}>
      {children}
    </div>
  );
}
