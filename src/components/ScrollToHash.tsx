import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET_PX = 96;

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!location.hash) return;

    const id = location.hash.slice(1);
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
    window.scrollTo({ top, behavior: "smooth" });
  }, [location.hash, location.pathname]);

  return null;
};

export default ScrollToHash;

