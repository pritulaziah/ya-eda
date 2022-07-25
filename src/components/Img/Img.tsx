import { useState, useRef, ImgHTMLAttributes, useEffect } from "react";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  lazy?: boolean;
  altSrc?: string;
  loadImage?: (image: HTMLImageElement) => void;
  errorImage?: (image: HTMLImageElement) => void;
  intersectionOptions?: IntersectionObserverInit;
}

const Img = ({
  src,
  alt = "",
  lazy = true,
  altSrc,
  loadImage,
  errorImage,
  intersectionOptions = {},
  ...restProps
}: IProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(!lazy);

  useEffect(() => {
    const image = imageRef?.current;

    if (inView || !image) {
      return undefined;
    }

    let didCancel = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !didCancel &&
          (entry.intersectionRatio > 0 || entry.isIntersecting)
        ) {
          setInView(true);
          observer.unobserve(image);
        }
      },
      {
        threshold: intersectionOptions.threshold,
        root: intersectionOptions.root,
        rootMargin: intersectionOptions.rootMargin,
      }
    );
    observer.observe(image);

    return () => {
      didCancel = true;
      observer.unobserve(image);
    };
  }, [
    lazy,
    inView,
    intersectionOptions.threshold,
    intersectionOptions.root,
    intersectionOptions.rootMargin,
  ]);

  const onLoad = () => {
    loadImage && imageRef.current && loadImage(imageRef.current);
  };

  const onError = () => {
    altSrc && setHasError(true);
    errorImage && imageRef.current && errorImage(imageRef.current);
  };

  const isAlt = hasError && altSrc;

  return (
    <img
      {...restProps}
      style={{
        ...restProps.style,
        visibility: isAlt || inView ? "visible" : "hidden",
      }}
      ref={imageRef}
      src={isAlt ? altSrc : inView ? src : undefined}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default Img;
