"use client";

import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Global/Header";
import Footer from "@/components/Global/Footer";
import Loader from "@/components/Global/Loader";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Lenis from "lenis";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const loading = useSelector(state => state.loader.loading);

  let pageClass = "home";

  if (pathname.startsWith("/career/")) {
    pageClass = "career-single";
  } else {
    pageClass =
      pathname
        ?.replace(/\//g, "-")
        ?.replace(/^-/, "")
        ?.replace(/[^a-zA-Z0-9-_]/g, "") || "home";
  }

  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({
      duration: 1.4,
      smooth: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader />}

      <div className={`container-fluid ${pageClass}`}>
        {/* <Header /> */}

        <AnimatePresence mode="wait">
          <motion.div key={pathname} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
            {children}
          </motion.div>
        </AnimatePresence>

        {/* <Footer /> */}
      </div>
    </>
  );
}
