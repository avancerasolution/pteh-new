"use client";

import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import Bar from "@/assets/bar.png";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { menuAnim } from "@/lib/Animation";

export default function OffcanvasMenu() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (e, url) => {
    e.preventDefault();
    setShow(false);

    const [path, hash] = url.split("#");
    const currentPath = window.location.pathname;

    // ✅ SAME PAGE
    if (currentPath === path && hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
      return;
    }

    // ✅ DIFFERENT PAGE
    router.push(url);
  };

  const isActive = (url) => pathname === url;

  return (
    <>
      <button className="menu-btn" onClick={() => setShow(true)}>
        <Image src={Bar} alt="menu" />
      </button>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="top" className="top-offcanvas">
        <Offcanvas.Body>
          <AnimatePresence>
            {show && (
              <motion.div variants={menuAnim} initial="hidden" animate="show" exit="exit">
                {/* CLOSE BUTTON */}
                <button className="menu-close" onClick={() => setShow(false)}>
                  ✕
                </button>

                <div className="container menu-wrapper">
                  <div className="row align-items-start">
                    {/* COLUMN 1 */}
                    <div className="col-sm-4 menu-col">
                      <Link
                        className={isActive("/executive-summary") ? "active" : ""}
                        href="/executive-summary"
                        onClick={(e) => navigate(e, "/executive-summary")}
                      >
                        Executive Summary
                      </Link>
                      <Link href="/case-for-change" onClick={(e) => navigate(e, "/case-for-change")}>
                        Case for Change
                      </Link>
                      <Link href="/?slide=1" onClick={(e) => navigate(e, "/?slide=1")}>
                        Jump to the Action House
                      </Link>
                      <Link href="/the-background" onClick={(e) => navigate(e, "/the-background")}>
                        The Background
                      </Link>
                    </div>

                    <div className="col-sm-1 divider-col">
                      <span className="vertical-divider" />
                    </div>

                    {/* COLUMN 2 */}
                    <div className="col-sm-3 menu-col">
                      <Link href="/dashboard" onClick={(e) => navigate(e, "/dashboard")}>
                        Dashboard
                      </Link>
                      <Link href="/priorities" onClick={(e) => navigate(e, "/priorities")}>
                        Priorities
                      </Link>
                      <Link href="/actions" onClick={(e) => navigate(e, "/actions")}>
                        Actions
                      </Link>
                      <Link href="/our-data" onClick={(e) => navigate(e, "/our-data")}>
                        Data
                      </Link>
                      <Link href="/future-state" onClick={(e) => navigate(e, "/future-state")}>
                        Future State
                      </Link>
                    </div>

                    <div className="col-sm-1 divider-col">
                      <span className="vertical-divider" />
                    </div>

                    {/* COLUMN 3 */}
                    <div className="col-sm-3 menu-col">
                      <Link href="/get-in-touch" onClick={(e) => navigate(e, "/get-in-touch")}>
                        Get in Touch
                      </Link>
                      <Link href="/get-in-touch#donate" onClick={(e) => navigate(e, "/get-in-touch#donate")}>
                        Donate
                      </Link>
                      <Link href="/privacy-policy" onClick={(e) => navigate(e, "/privacy-policy")}>
                        Privacy Policy
                      </Link>
                      <Link href="/acknowledgements" onClick={(e) => navigate(e, "/acknowledgements")}>
                        Acknowledgements
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
