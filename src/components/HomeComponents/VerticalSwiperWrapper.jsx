"use client";

import { useRef, useState, useEffect } from "react";
import VerticalSwiper from "./VerticalSwiper";
import GlobalLoader from "@/components/GlobalLoader";

export default function VerticalSwiperWrapper() {
  const swiperRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <GlobalLoader />;

  return <VerticalSwiper swiperRef={swiperRef} activeSlide={activeSlide} setActiveSlide={setActiveSlide} />;
}
