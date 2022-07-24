import clsx from "clsx";
import React, { MutableRefObject } from "react";
import { useEffect } from "react";
import getElementCoords from "utils/getElementCoords";
import { RestorantMenuCategoryNavigationItem } from "types/RestaurantMenu";

interface IProps {
  item: RestorantMenuCategoryNavigationItem;
  className?: React.HTMLAttributes<HTMLElement>["className"];
  active: boolean;
}

const NavigationItem = React.forwardRef<HTMLLIElement, IProps>(
  ({ item, className, active }, ref) => {
    const handleClick = () => {
      const elementToScroll = document.querySelector(
        `[data-category-id="${item.id}"]`
      );

      if (elementToScroll) {
        const y = getElementCoords(elementToScroll).top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    useEffect(() => {
      const { current: navItem } =
        ref as MutableRefObject<HTMLLIElement | null>;

      if (active && navItem) {
        document.documentElement.style.setProperty(
          "--markerWidth",
          `${navItem.offsetWidth}px`
        );
        document.documentElement.style.setProperty(
          "--markerLeft",
          `${navItem.offsetLeft}px`
        );
      }
    }, [active]);

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
          "transition-colors",
          "whitespace-nowrap",
          className,
          active ? "text-slate-900" : "hover:text-slate-900",
        ])}
      >
        {item.title}
      </li>
    );
  }
);

const MemoizedNavigationItem = React.memo(NavigationItem);

export default MemoizedNavigationItem;
