import React, { MutableRefObject } from "react";
import useClickOutside from "hooks/useClickOutside";
import clsx from "clsx";
import { RestorantMenuCategoryNavigationItem } from "types/RestaurantMenu";
import NavigationItem from "./NavigationItem";

interface IProps {
  width: number;
  navigations: RestorantMenuCategoryNavigationItem[];
  onClose: () => void;
  activeSelectionId: number | null;
}

const ExtraNavigationList = React.forwardRef<HTMLUListElement, IProps>(
  ({ width, navigations, onClose, activeSelectionId }, ref) => {
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
        {navigations.map((navigationItem) => {
          const active = navigationItem.id === activeSelectionId;

          return (
            <NavigationItem
              key={navigationItem.id}
              item={navigationItem}
              className={clsx([
                "py-4",
                "hover:bg-gray-100",
                "transition-colors",
                active ? "bg-gray-100" : "bg-transparent hover:bg-gray-100",
              ])}
              active={active}
            />
          );
        })}
      </ul>
    );
  }
);

export default ExtraNavigationList;
