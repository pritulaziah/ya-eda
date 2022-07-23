import clsx from "clsx";
import React, { useRef, useEffect, useCallback } from "react";
import { useState } from "react";
import ExtraNavigation from "./ExtraNavigation";
import NavigationItem from "./NavigationItem";

export interface INavigationItem {
  title: string;
}

interface IProps {
  navigations: INavigationItem[];
}

const NavigationBar = ({ navigations }: IProps) => {
  const [isFixed, setIsFixed] = useState(false);
  const navigationRef = useRef<HTMLDivElement>(null);
  const navigationListRef = useRef<HTMLUListElement>(null);
  const [extraIndex, setExtraIndex] = useState(-1);
  const navigationRefs = useRef<React.RefObject<HTMLLIElement>[]>(
    navigations.map(() => React.createRef<HTMLLIElement>())
  );

  const handleScroll = useCallback(() => {
    const { current: navigation } = navigationRef;

    if (!navigation) {
      return;
    }

    const currentScrollTop =
      (window.scrollY && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    const scrollValue = navigation.offsetHeight;

    if (currentScrollTop >= scrollValue && !isFixed) {
      setIsFixed(true);
    } else if (currentScrollTop < scrollValue && isFixed) {
      setIsFixed(false);
      // Левая стрелка должна вернуться в начало, если табы вернулись в начальное положение.
    }
  }, [isFixed]);

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

    setExtraIndex(currentExtraIndex - 1);
  }, [setExtraIndex, navigationListRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("resize", getExtraIndex);
    getExtraIndex();

    return () => {
      window.removeEventListener("resize", getExtraIndex);
    };
  }, [getExtraIndex]);

  return (
    <>
      {isFixed && (
        <div style={{ paddingTop: navigationRef.current?.offsetHeight || 0 }} />
      )}
      <div
        ref={navigationRef}
        className={clsx(
          "border-gray-200 border-solid border-b px-20 flex flex-row bg-white",
          isFixed && "fixed max-w-screen-lg mx-auto top-0"
        )}
        style={{ transform: "translateZ(0)" }}
      >
        <ul
          className="flex flex-wrap overflow-hidden -mx-4 w-full"
          ref={navigationListRef}
        >
          {navigations.map(({ title }, index) => (
            <NavigationItem key={index} ref={navigationRefs.current[index]}>
              {title}
            </NavigationItem>
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
    </>
  );
};

export default NavigationBar;
