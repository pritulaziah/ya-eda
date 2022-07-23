import React, { useRef, useState, useCallback } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import { MenuCategoryNavigationItem } from "types/MenuList";
import ExtraNavigationList from "./ExtraNavigationList";

interface IProps {
  extraIndex: number;
  navigations: MenuCategoryNavigationItem[];
  navigationRefs: React.RefObject<React.RefObject<HTMLLIElement>[]>;
}

const ExtraNavigation = ({
  navigations,
  navigationRefs,
  extraIndex,
}: IProps) => {
  const [expanded, setExpanded] = useState(false);
  const extraNavigationListRef = useRef<HTMLUListElement>(null);
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

  const onChangeExpanded = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // stop bubbling react
    setExpanded((prevState) => !prevState);
  };

  const onCloseExpanded = useCallback(() => {
    setExpanded(false);
  }, [setExpanded]);

  return (
    <div
      onClick={onChangeExpanded}
      className={clsx([
        "flex",
        "content-end",
        "items-center",
        "cursor-pointer",
        "relative",
        "text-gray-700",
        "transition-colors",
        expanded ? "text-gray-300" : "hover:text-slate-900",
      ])}
    >
      <span>Ещё</span>
      <span
        className={clsx([
          "ml-2",
          "text-xs",
          "flex",
          "transition-transform",
          expanded ? "rotate-180" : "rotate-0",
        ])}
      >
        <FontAwesomeIcon icon="chevron-down" />
      </span>
      <CSSTransition
        in={expanded}
        timeout={100}
        unmountOnExit
        classNames={{
          enter: "opacity-0",
          enterActive: "opacity-0 translate-x-0 transition duration-100",
          exit: "opacity-100",
          exitActive: "opacity-0 scale-90 transition duration-100",
        }}
        nodeRef={extraNavigationListRef}
      >
        <ExtraNavigationList
          width={maxWidth}
          navigations={extraNavigations}
          onClose={onCloseExpanded}
          ref={extraNavigationListRef}
        />
      </CSSTransition>
    </div>
  );
};

const MemoizedExtraNavigation = React.memo(ExtraNavigation);

ExtraNavigation.displayName = "ExtraNavigation";

export default MemoizedExtraNavigation;
