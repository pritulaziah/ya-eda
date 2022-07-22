import React, { useEffect } from "react";

const useClickOutside = <
  T extends HTMLElement = HTMLElement,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  ref: React.RefObject<T>,
  onClickOutside: (event: DocumentEventMap[K]) => void,
  eventName: K = "click" as K, // dont know how do 'click' equal K
  { useCapture = false }: { useCapture?: boolean } = {}
) => {
  useEffect(() => {
    const targetElement: T | null = ref?.current;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    function handleClickOutside(event: DocumentEventMap[K]) {
      console.log("Yo");
      if (!(targetElement as T).contains(event.target as Node)) {
        onClickOutside(event);
      }
    }

    document.addEventListener(eventName, handleClickOutside, {
      capture: useCapture,
    });

    return () =>
      document.removeEventListener(eventName, handleClickOutside, {
        capture: useCapture,
      });
  }, [onClickOutside, ref]);
};

export default useClickOutside;
