const getElementCoords = <T extends Element>(element: T) => {
  if (element) {
    const { left, top } = element.getBoundingClientRect();

    return { left, top };
  }

  return { top: 0, left: 0 };
};

export default getElementCoords;
