import React from "react";

export interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}
function Navbar({ children, className }: NavbarProps) {
  return <nav className={className}>{children}hiiiii</nav>;
}

export default Navbar;
