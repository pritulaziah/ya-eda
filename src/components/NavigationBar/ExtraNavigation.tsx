import React, { useRef, useState, useImperativeHandle } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import { RestorantMenuCategoryNavigationItem } from "types/RestaurantMenu";
import ExtraNavigationList from "./ExtraNavigationList";

export type ExtraNavigationRef = {
  offsetLeft: number;
  offsetWidth: number;
};

interface IProps {
  extraIndex: number;
  navigations: RestorantMenuCategoryNavigationItem[];
  navigationRefs: React.RefObject<React.RefObject<HTMLLIElement>[]>;
  activeSelectionId: number | null;
}

const ExtraNavigation = React.forwardRef<ExtraNavigationRef, IProps>(
  ({ navigations, navigationRefs, extraIndex, activeSelectionId }, ref) => {
    const [expanded, setExpanded] = useState(false);
    const extraNavigationRef = useRef<HTMLDivElement>(null);
    const extraNavigationListRef = useRef<HTMLUListElement>(null);
    const extraNavigations = navigations.slice(extraIndex);
    const extraNavigationRefs = navigationRefs.current?.slice(extraIndex) || [];
    // coz absolute position element we need set width equals max width tab
    const maxWidth = Math.max(
      ...extraNavigationRefs.map(
        (extraNavigationRef) => extraNavigationRef.current?.offsetWidth || 0
      ),
      0
    );
    const extraActive = extraNavigations.find(
      (extraNavigationItem) => extraNavigationItem.id === activeSelectionId
    );

    useImperativeHandle(ref, () => ({
      offsetLeft: extraNavigationRef.current?.offsetLeft || 0,
      offsetWidth: extraNavigationRef.current?.offsetWidth || 0,
    }));

    const onChangeExpanded = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation(); // stop bubbling react
      setExpanded((prevState) => !prevState);
    };

    const onCloseExpanded = () => {
      setExpanded(false);
    };

    return (
      <div
        ref={extraNavigationRef}
        onClick={onChangeExpanded}
        className={clsx([
          "flex",
          "items-center",
          "cursor-pointer",
          "relative",
          "h-full",
          "text-gray-700",
          "transition-colors",
          "ml-4",
          "px-4",
          expanded ? "text-gray-300" : "hover:text-slate-900",
          extraIndex === -1 ? "invisible" : "visible",
        ])}
      >
        <span className="whitespace-nowrap">{extraActive?.title || "Ещё"}</span>
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
            activeSelectionId={activeSelectionId}
          />
        </CSSTransition>
      </div>
    );
  }
);

const MemoizedExtraNavigation = React.memo(ExtraNavigation);

ExtraNavigation.displayName = "ExtraNavigation";

export default MemoizedExtraNavigation;
