"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import { motion } from "framer-motion";
import { limitWordsContent } from "@/lib/LimitWords";
import { fetchSteeringPosts, selectSteeringPosts, selectSteeringLoading } from "@/store/slices/SteeringSlice";
import { cardContainer, cardItem, rowAnim } from "@/lib/Animation";
import "swiper/css";
import "swiper/css/pagination";
import GlobalLoader from "@/components/Global/GlobalLoader";

export default function SteeringPost({ isActive }) {
  const dispatch = useDispatch();
  const posts = useSelector(selectSteeringPosts);
  const loading = useSelector(selectSteeringLoading);

  const [activePost, setActivePost] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchSteeringPosts());
  }, [dispatch]);

  if (loading)
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  if (!posts?.length) return null;

  const back = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Frame-1367.png";

  // 🔥 SAFE OPEN HANDLER (animation reset guaranteed)
  const openCanvas = post => {
    setActivePost(post);
    setTimeout(() => setShow(true), 50);
  };

  return (
    <>
      {/* ===================== SLIDER ===================== */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={5}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 5 }
        }}>
        {posts.map(post => {
          const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";

          return (
            <SwiperSlide key={post.id}>
              <motion.div className="steering-card" variants={cardContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }}>
                {/* IMAGE */}
                <motion.div variants={cardItem}>
                  <Image src={image} alt={post.title.rendered} width={400} height={400} />
                </motion.div>

                {/* TITLE */}
                <motion.h5
                  variants={cardItem}
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered
                  }}
                />

                {/* TEXT */}
                <motion.p className="designation" variants={cardItem}>
                  {limitWordsContent(post.content.rendered)}
                </motion.p>

                {/* BUTTON */}
                <motion.button variants={cardItem} className="white-btn" whileHover={{ scale: 0.95 }} onClick={() => openCanvas(post)}>
                  Explore more →
                </motion.button>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* ===================== OFFCANVAS ===================== */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end" className="full-offcanvas" backdrop scroll={false}>
        <Offcanvas.Body>
          {activePost && (
            <motion.div className="container" variants={cardContainer} initial="hidden" animate={show ? "show" : "hidden"}>
              <div className="row">
                {/* IMAGE */}
                <motion.div className="col-sm-6" variants={rowAnim} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
                  <Image src={activePost._embedded?.["wp:featuredmedia"]?.[0]?.source_url} alt={activePost.title.rendered} width={500} height={500} />
                </motion.div>

                {/* CONTENT */}
                <motion.div className="col-sm-6" variants={rowAnim} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: activePost.title.rendered
                    }}
                  />
                  <h6>{activePost.acf?.designation}</h6>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: activePost.content.rendered
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </Offcanvas.Body>

        {/* CLOSE BUTTON */}
        <button className="offcanvas-close" onClick={() => setShow(false)}>
          <Image src={back} alt="Close" width={400} height={60} />
        </button>
      </Offcanvas>
    </>
  );
}
