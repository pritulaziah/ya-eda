import clsx from "clsx";
import React from "react";
import { INavigationItem } from "./NavigationBar";

interface IProps extends Omit<INavigationItem, "title"> {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLElement>["className"];
}

const NavigationItem = React.forwardRef<HTMLLIElement, IProps>(
  ({ children, className }, ref) => {
    const handleClick = () => {};

    return (
      <li
        ref={ref}
        onClick={handleClick}
        className={clsx([
          "flex",
          "px-4",
          "h-full",
          "text-center",
          "items-center",
          "text-gray-700",
          "cursor-pointer",
          "hover:text-slate-900",
          "transition-colors",
          "whitespace-nowrap",
          className,
        ])}
      >
        {children}
      </li>
    );
  }
);

const MemoizedNavigationItem = React.memo(NavigationItem);

export default MemoizedNavigationItem;
