import { twj } from "tw-to-css";
export default function Box({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  // const { style } = resolveStyles(tailwindToStyleObject(className!));

  const styleInline = twj(`${className}`);

  return (
    <div className={`${className} border`} style={styleInline}>
      {children}
    </div>
  );
}
