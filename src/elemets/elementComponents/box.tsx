// import { type ReactNode } from "react";
// interface IDiv {
//   children?: ReactNode;
//   classname?: string;
// }

// function Box({ children, classname }: IDiv) {
//   console.log("the classname", classname);
//   return <div className={`${classname} bg-red-500`}>{children}</div>;
// }

// export default Box;

export default function Box({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <div className={`${className}`}>{children}</div>;
}
