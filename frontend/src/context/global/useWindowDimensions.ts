/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import { useEffect, useState } from 'react';

type WindowDimentions = {
  screenWidth: number | undefined;
  screenHeight: number | undefined;
  isDesktop: boolean;
  isHalfDesktop: boolean;
  isHalf: boolean;
  isHalfMobile: boolean;
  isMobile: boolean;
};

const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    screenWidth: undefined,
    screenHeight: undefined,
    isDesktop: true,
    isHalfDesktop: false,
    isHalf: false,
    isHalfMobile: false,
    isMobile: false,
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        isDesktop: window.innerWidth > 992,
        isHalfDesktop: window.innerWidth > 768 && window.innerWidth <= 992,
        isHalf: window.innerWidth > 576 && window.innerWidth <= 768,
        isHalfMobile: window.innerWidth > 420 && window.innerWidth <= 576,
        isMobile: window.innerWidth <= 420,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};

export default useWindowDimensions;