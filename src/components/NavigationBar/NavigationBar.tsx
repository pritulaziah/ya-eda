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
  const navigationRef = useRef<HTMLUListElement>(null);
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

    setExtraIndex(currentExtraIndex - 1);
  }, [setExtraIndex, navigationRef]);

  useEffect(() => {
    window.addEventListener("resize", getExtraIndex);
    getExtraIndex();

    return () => {
      window.removeEventListener("resize", getExtraIndex);
    };
  }, [getExtraIndex]);

  return (
    <div className="border-gray-200 border-solid border-b flex px-20 text-gray-900">
      <ul
        className="flex flex-wrap overflow-hidden -mx-4 w-full"
        ref={navigationRef}
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
  );
};

export default NavigationBar;
