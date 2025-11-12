import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollBehavior = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // smooth scroll
      });
    };

    // small delay for faster + smoother effect
    const timeout = setTimeout(scrollBehavior, 150);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
