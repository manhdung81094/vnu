import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const isClient = typeof window !== "undefined";

  const getSize = () => {
    const headerHeight =
      document.querySelector("[id*='header']")?.clientHeight || 0;
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight - headerHeight : 0, // Trừ chiều cao header từ chiều cao màn hình
      isMobile: isClient ? window.innerWidth <= 576 : false,
    };
  };
  const [windowSize, setWindowSize] = useState(getSize);
  //   const [windowSize, setWindowSize] = useState({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //     isMobile: window.innerWidth <= 576,
  //   });

  //   useEffect(() => {
  //     const handler = () => {
  //       setWindowSize({
  //         width: window.innerWidth,
  //         height: window.innerHeight,
  //         isMobile: window.innerWidth <= 576,
  //       });
  //     };
  //     window.addEventListener("resize", handler);

  //     return () => {
  //       window.removeEventListener("resize", handler);
  //     };
  //   }, []);

  useEffect(() => {
    if (!isClient) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize(getSize());
      }, 150); // Debounce delay (adjust as needed)
    };

    window.addEventListener("resize", handleResize);

    // Call it initially in case the size changed before effect ran
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return windowSize;
};
