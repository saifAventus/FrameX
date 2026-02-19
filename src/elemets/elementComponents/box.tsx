export default function Box({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  console.log(className, "classname");
  return <div className={`${className} border`}>{children}</div>;
}
