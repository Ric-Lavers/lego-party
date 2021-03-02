import { useState, useEffect } from "react";

/**
 * returns the nav-up class name when scrolling up.
 */
const useScrollHide = () => {
  const [show, setShow] = useState("");

  useEffect(() => {
    let lastScrollTop = 0;
    window.addEventListener("scroll", (x) => {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop && show !== "nav-up") {
        // downscroll code
        setShow("nav-up");
      } else if (!show) {
        // upscroll code
        setShow("");
      }
      lastScrollTop = st <= 0 ? 0 : st;
    });
  }, []);
  return show;
};

export default useScrollHide;
