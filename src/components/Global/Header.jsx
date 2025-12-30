"use client";

import Link from "next/link";
import Image from "next/image";
import LOGO from "@/assets/loader-logo.png";
import Home from "@/assets/home.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OffcanvasMenu from "./OffcanvasMenu";
import { goToVision } from "@/lib/GoTo";

function Header({ swiperRef, activeSlide }) {
  const loading = useSelector(state => state.loader.loading);
  const [isSticky, setSticky] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`mainHeader default-header ${isSticky ? "hide-header" : ""} slide-${activeSlide}`}>
      <div className="container">
        <div className="row fixedheader">
          <motion.div initial={{ opacity: 0, x: -200 }} animate={!loading ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="col-sm-6">
            <Link href="/">
              <Image src={LOGO} alt="logo" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 200 }} animate={!loading ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="col-sm-6 mainmenu">
            {/* 🔥 HOME ICON */}
            <Image src={Home} alt="home" onClick={() => goToVision(swiperRef, router)} style={{ cursor: "pointer" }} />
            <OffcanvasMenu />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Header;
