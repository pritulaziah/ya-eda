import clsx from "clsx";
import React from "react";
import { MenuCategoryNavigationItem } from "types/MenuList";

interface IProps {
  item: MenuCategoryNavigationItem;
  className?: React.HTMLAttributes<HTMLElement>["className"];
}

const NavigationItem = React.forwardRef<HTMLLIElement, IProps>(
  ({ item, className }, ref) => {
    const handleClick = () => {
      const elementToScroll = document.querySelector(
        `[data-category-id="${item.id}"]`
      );

      if (elementToScroll) {
        const y =
          elementToScroll.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

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
        {item.title}
      </li>
    );
  }
);

const MemoizedNavigationItem = React.memo(NavigationItem);

export default MemoizedNavigationItem;
