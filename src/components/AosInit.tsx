"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

export default function AosInit() {
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
      });
    });
  }, []);

  return null;
}
