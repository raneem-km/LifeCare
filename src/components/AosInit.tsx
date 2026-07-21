"use client";

import { useEffect } from "react";

export default function AosInit() {
  useEffect(() => {
    Promise.all([
      import("aos"),
      // @ts-ignore
      import("aos/dist/aos.css")
    ]).then(([AOS]) => {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
      });
    });
  }, []);

  return null;
}
