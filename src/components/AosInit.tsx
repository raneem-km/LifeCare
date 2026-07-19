"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation takes 0.8 seconds
      once: true,    // Animation should happen only once while scrolling down
      offset: 100,   // Offset (in px) from the original trigger point
    });
  }, []);

  return null;
}
