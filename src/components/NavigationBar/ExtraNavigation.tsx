import React, { useRef } from "react";
import NavigationItem from "./NavigationItem";
import { INavigationItem } from "./NavigationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "hooks/useClickOutside";
import { useCallback } from "react";

interface IProps {
  extraIndex: number;
  navigations: INavigationItem[];
  expanded: boolean;
  onChangeExpanded: () => void;
  navigationRefs: React.RefObject<React.RefObject<HTMLLIElement>[]>;
}

const ExtraNavigation = ({
  navigations,
  expanded,
  onChangeExpanded,
  navigationRefs,
  extraIndex,
}: IProps) => {
  const extraNavigationRef = useRef<HTMLUListElement>(null);

  const a = useCallback(
    (event: any) => {
      expanded && onChangeExpanded();
    },
    [expanded]
  );

  useClickOutside(extraNavigationRef, a);
  const extraNavigations = navigations.slice(extraIndex);
  const extraNavigationRefs = navigationRefs.current?.slice(extraIndex) || [];
  // Из-за абсолютного позиционирования под элементом,
  // нужно задать ширину равную максимальной ширине таба
  const maxWidth = Math.max(
    ...extraNavigationRefs.map(
      (extraNavigationRef) => extraNavigationRef.current?.offsetWidth || 0
    ),
    0
  );

  return (
    <div
      onClick={onChangeExpanded}
      className="flex content-end items-center cursor-pointer relative"
    >
      <span>Ещё</span>
      <span
        className={clsx(
          "ml-2 text-xs flex transition-transform",
          expanded ? "rotate-180" : "rotate-0"
        )}
      >
        <FontAwesomeIcon icon="chevron-down" />
      </span>
      <CSSTransition
        in={expanded}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: "opacity-0",
          enterActive: "opacity-0 translate-x-0 transition",
          exit: "opacity-100",
          exitActive: "opacity-0 scale-90 transition",
        }}
        nodeRef={extraNavigationRef}
      >
        <ul
          style={{ width: `${maxWidth}px` }}
          ref={extraNavigationRef}
          className="absolute flex flex-col shadow-md rounded-3xl bg-white left-2/4 top-full -translate-x-1/2"
        >
          {extraNavigations.map(({ title }, index) => (
            <NavigationItem key={index}>{title}</NavigationItem>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

const MemoizedExtraNavigation = React.memo(ExtraNavigation);

export default MemoizedExtraNavigation;
