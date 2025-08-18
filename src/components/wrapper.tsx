import { cn } from "@/lib/utils";
import React, { JSX } from "react";

const Wrapper = ({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) => {
  return (
    <Component className={cn("max-w-7xl mx-auto px-4", className)}>
      {children}
    </Component>
  );
};

export default Wrapper;
