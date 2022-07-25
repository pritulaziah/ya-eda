import React, { useRef, useEffect, useCallback, useState } from "react";
import clsx from "clsx";
import ExtraNavigation, { ExtraNavigationRef } from "./ExtraNavigation";
import NavigationItem from "./NavigationItem";
import { RestorantMenuCategoryNavigationItem } from "types/RestaurantMenu";

interface IProps {
  navigations: RestorantMenuCategoryNavigationItem[];
}

const NavigationBar = ({ navigations }: IProps) => {
  const [extraIndex, setExtraIndex] = useState(-1);
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const navigationListRef = useRef<HTMLUListElement>(null);
  const navigationRefs = useRef<React.RefObject<HTMLLIElement>[]>(
    navigations.map(() => React.createRef<HTMLLIElement>())
  );
  const markerRef = useRef<HTMLDivElement>(null);
  const extraNavigationRef = useRef<ExtraNavigationRef>(null);

  const getExtraIndex = useCallback(() => {
    const { current: navigationList } = navigationListRef;

    if (!navigationList) {
      return;
    }

    let totalWidth = 0;
    const navigationWidth = navigationList.clientWidth;

    const currentExtraIdx = navigations.findIndex((_, index) => {
      const currentNavigationItem = navigationRefs.current[index].current;

      if (currentNavigationItem) {
        totalWidth += currentNavigationItem.offsetWidth;
      }

      return totalWidth >= navigationWidth;
    });

    setExtraIndex(currentExtraIdx);
  }, [setExtraIndex, navigationListRef, activeSectionId, navigations]);

  useEffect(() => {
    navigationRefs.current = navigations.map(() =>
      React.createRef<HTMLLIElement>()
    );
  }, [navigations]);

  useEffect(() => {
    window.addEventListener("resize", getExtraIndex);
    getExtraIndex();

    return () => {
      window.removeEventListener("resize", getExtraIndex);
    };
  }, [getExtraIndex]);

  useEffect(() => {
    const activeSectionIdx = navigations.findIndex(
      (navigationItem) => navigationItem.id === activeSectionId
    );

    if (activeSectionIdx !== -1) {
      const currentNavigationItem =
        navigationRefs.current[activeSectionIdx].current;
      const isVisible = activeSectionIdx < extraIndex;

      if (currentNavigationItem) {
        document.documentElement.style.setProperty(
          "--markerWidth",
          `${
            isVisible
              ? currentNavigationItem.offsetWidth
              : extraNavigationRef?.current?.offsetWidth
          }px`
        );

        document.documentElement.style.setProperty(
          "--markerLeft",
          `${
            isVisible
              ? currentNavigationItem.offsetLeft
              : extraNavigationRef?.current?.offsetLeft
          }px`
        );
      }
    }
  }, [activeSectionId, extraIndex, navigations]);

  useEffect(() => {
    const { current: navigation } = navigationRef;

    if (!navigation) {
      return undefined;
    }

    let didCancel = false;

    const sectionObserveCategories = navigations.reduce<{
      [key: string]: {
        section: Element;
        isIntersecting: boolean;
        intersectionRatio: number;
      };
    }>((acc, navigationItem) => {
      const section = document.querySelector(
        `[data-category-id="${navigationItem.id}"]`
      );

      if (section) {
        acc[navigationItem.id] = {
          isIntersecting: false,
          intersectionRatio: -1,
          section,
        };
      }

      return acc;
    }, {});

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: `-${navigation.offsetHeight}px 0px 0px 0px`,
    });

    function observerCallback(entries: IntersectionObserverEntry[]) {
      if (didCancel) {
        return;
      }

      entries.forEach((entry) => {
        const categoryId = (entry.target as HTMLElement).dataset.categoryId;

        if (categoryId) {
          sectionObserveCategories[categoryId] = {
            ...sectionObserveCategories[categoryId],
            intersectionRatio: entry.intersectionRatio,
            isIntersecting: entry.isIntersecting,
          };
        }
      });

      const [firstIntersectionSection] = Object.entries(
        sectionObserveCategories
      )
        .filter(([_, section]) => section.isIntersecting)
        .sort(
          ([, sectionA], [, sectionB]) =>
            sectionB.intersectionRatio - sectionA.intersectionRatio
        );
      const [categoryId] = firstIntersectionSection || [];
      setActiveSectionId(Number(categoryId));
    }

    for (const categoryId in sectionObserveCategories) {
      observer.observe(sectionObserveCategories[categoryId].section);
    }

    return () => {
      didCancel = true;

      observer.disconnect();
    };
  }, [navigations]);

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
        "relative",
      ])}
    >
      <div
        className={clsx([
          "absolute",
          "bg-amber-300",
          "bottom-0",
          "left-0",
          "h-1",
          "will-change-transform",
          "transition-transform",
        ])}
        style={{
          transform: "translate3d(var(--markerLeft, 0), 0, 0)",
          width: "var(--markerWidth, 0)",
        }}
        ref={markerRef}
      />
      <ul
        className={clsx([
          "flex",
          "flex-wrap",
          "overflow-hidden",
          "-mx-4",
          "w-full",
        ])}
        ref={navigationListRef}
      >
        {navigations.map((navigationItem, index) => (
          <NavigationItem
            key={navigationItem.id}
            item={navigationItem}
            ref={navigationRefs.current[index]}
            active={navigationItem.id === activeSectionId}
          />
        ))}
      </ul>
      <ExtraNavigation
        navigations={navigations}
        extraIndex={extraIndex}
        navigationRefs={navigationRefs}
        activeSelectionId={activeSectionId}
        ref={extraNavigationRef}
      />
    </div>
  );
};

export default NavigationBar;
