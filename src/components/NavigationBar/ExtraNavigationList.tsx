import React, { MutableRefObject } from "react";
import useClickOutside from "hooks/useClickOutside";
import NavigationItem from "./NavigationItem";
import { MenuCategoryNavigationItem } from "types/MenuList";
import clsx from "clsx";

interface IProps {
  width: number;
  navigations: MenuCategoryNavigationItem[];
  onClose: () => void;
}

const ExtraNavigationList = React.forwardRef<HTMLUListElement, IProps>(
  ({ width, navigations, onClose }, ref) => {
    useClickOutside(ref as MutableRefObject<HTMLUListElement>, onClose);

    return (
      <ul
        style={{ width: `${width}px`, top: "calc(100% + 8px)" }}
        ref={ref}
        className={clsx([
          "absolute",
          "flex",
          "flex-col",
          "shadow-md",
          "rounded-3xl",
          "bg-white",
          "left-2/4",
          "top-full",
          "-translate-x-1/2",
          "overflow-auto",
        ])}
      >
        {navigations.map((navigationItem) => (
          <NavigationItem
            key={navigationItem.id}
            item={navigationItem}
            className={clsx([
              "py-4",
              "bg-transparent",
              "hover:bg-gray-100",
              "transition-colors",
            ])}
          />
        ))}
      </ul>
    );
  }
);

export default ExtraNavigationList;
