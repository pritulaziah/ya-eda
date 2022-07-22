import React from "react";
import { INavigationItem } from "./NavigationBar";

interface IProps extends Omit<INavigationItem, "title"> {
  children: React.ReactNode;
}

const NavigationItem = React.forwardRef<HTMLLIElement, IProps>(
  ({ children }, ref) => {
    const handleClick = () => {};

    return (
      <li
        ref={ref}
        onClick={handleClick}
        className="flex px-4 h-full text-center items-center"
      >
        {children}
      </li>
    );
  }
);

const MemoizedNavigationItem = React.memo(NavigationItem);

export default MemoizedNavigationItem;
