import React, { useRef, useEffect, useCallback, useState } from "react";
import clsx from "clsx";
import ExtraNavigation from "./ExtraNavigation";
import NavigationItem from "./NavigationItem";
import { MenuCategoryNavigationItem } from "types/MenuList";

interface IProps {
  navigations: MenuCategoryNavigationItem[];
}

const NavigationBar = ({ navigations }: IProps) => {
  const navigationRef = useRef<HTMLDivElement>(null);
  const navigationListRef = useRef<HTMLUListElement>(null);
  const [extraIndex, setExtraIndex] = useState(-1);
  const navigationRefs = useRef<React.RefObject<HTMLLIElement>[]>(
    navigations.map(() => React.createRef<HTMLLIElement>())
  );

  const getExtraIndex = useCallback(() => {
    const { current: navigation } = navigationRef;

    if (!navigation) {
      return;
    }

    let totalWidth = 0;
    const navigationWidth = navigation.clientWidth;

    const currentExtraIndex = navigations.findIndex((_, index) => {
      const navigationItem = navigationRefs.current[index].current;

      if (navigationItem) {
        totalWidth += navigationItem.offsetWidth;
      }

      return totalWidth >= navigationWidth;
    });

    setExtraIndex(currentExtraIndex);
  }, [setExtraIndex, navigationListRef]);

  useEffect(() => {
    window.addEventListener("resize", getExtraIndex);
    getExtraIndex();

    return () => {
      window.removeEventListener("resize", getExtraIndex);
    };
  }, [getExtraIndex]);

  return (
    <div
      ref={navigationRef}
      className={clsx([
        "border-gray-200",
        "border-solid",
        "border-b",
        "px-20",
        "flex",
        "flex-row",
        "bg-white",
        "sticky",
        "top-0",
        "h-16",
      ])}
    >
      <ul
        className="flex flex-wrap overflow-hidden -mx-4 w-full"
        ref={navigationListRef}
      >
        {navigations.map((navigationItem, index) => (
          <NavigationItem
            key={navigationItem.id}
            item={navigationItem}
            ref={navigationRefs.current[index]}
          />
        ))}
      </ul>
      {extraIndex !== -1 && (
        <ExtraNavigation
          navigations={navigations}
          extraIndex={extraIndex}
          navigationRefs={navigationRefs}
        />
      )}
    </div>
  );
};

export default NavigationBar;
