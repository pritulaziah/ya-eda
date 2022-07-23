import React, { MutableRefObject } from "react";
import useClickOutside from "hooks/useClickOutside";
import NavigationItem from "./NavigationItem";
import { INavigationItem } from "./NavigationBar";

interface IProps {
  width: number;
  navigations: INavigationItem[];
  onClose: () => void;
}

const ExtraNavigationList = React.forwardRef<HTMLUListElement, IProps>(
  ({ width, navigations, onClose }, ref) => {
    useClickOutside(ref as MutableRefObject<HTMLUListElement>, onClose);

    return (
      <ul
        style={{ width: `${width}px` }}
        ref={ref}
        className="absolute flex flex-col shadow-md rounded-3xl bg-white left-2/4 top-full -translate-x-1/2"
      >
        {navigations.map(({ title }, index) => (
          <NavigationItem key={index}>{title}</NavigationItem>
        ))}
      </ul>
    );
  }
);

export default ExtraNavigationList;
