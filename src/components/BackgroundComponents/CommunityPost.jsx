"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchCommunityPosts, selectCommunityPosts, selectCommunityLoading } from "@/store/slices/CommunitySlice";
import { cardContainer, fromRight, fromLeft } from "@/lib/Animation";
import "swiper/css";
import "swiper/css/pagination";
import GlobalLoader from "@/components/Global/GlobalLoader";

/* ===================== DESKTOP FADE-IN ANIMATION ===================== */

export default function CommunityPost() {
  const dispatch = useDispatch();
  const posts = useSelector(selectCommunityPosts);
  const loading = useSelector(selectCommunityLoading);

  const [activePost, setActivePost] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchCommunityPosts());
  }, [dispatch]);

  if (loading)
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );

  if (!posts?.length) return null;

  const closeImg = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Frame-1367.png";

  const openCanvas = (post) => {
    setActivePost(post);
    setTimeout(() => setShow(true), 50);
  };

  return (
    <>
      {/* ===================== DESKTOP GRID ===================== */}
      <div className="container d-none d-xl-block">
        <div className="row desktop-row">
          {posts.map((post) => {
            const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";

            return (
              <div className="col-sm-3 mb-4" key={post.id}>
                <div onClick={() => openCanvas(post)} style={{ cursor: "pointer" }}>
                  <Image src={image} alt={post.title.rendered} width={400} height={400} className="img-fluid" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================== MOBILE / TABLET SLIDER ===================== */}
      <div className="d-block d-xl-none">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
        >
          {posts.map((post) => {
            const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";

            return (
              <SwiperSlide key={post.id}>
                <div>
                  <Image src={image} alt={post.title.rendered} width={400} height={400} className="img-fluid" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* ===================== OFFCANVAS ===================== */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        className="full-offcanvas communitycanvas"
        backdrop
        scroll={false}
      >
        <Offcanvas.Body>
          {activePost && (
            <motion.div
              className="container"
              variants={cardContainer}
              initial="hidden"
              animate={show ? "show" : "hidden"}
            >
              <div className="row">
                {/* CONTENT */}
                <motion.div className="col-sm-6" variants={fromLeft}>
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: activePost.title.rendered,
                    }}
                  />
                  <div
                    className="wysiwyg-text"
                    dangerouslySetInnerHTML={{
                      __html: activePost.content.rendered,
                    }}
                  />
                </motion.div>
                {/* IMAGE */}
                <motion.div className="col-sm-6" variants={fromRight}>
                  <Image
                    src={activePost._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                    alt={activePost.title.rendered}
                    width={500}
                    height={500}
                    className="img-fluid"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </Offcanvas.Body>

        {/* CLOSE BUTTON */}
        <button className="offcanvas-close" onClick={() => setShow(false)}>
          <Image src={closeImg} alt="Close" width={400} height={60} />
        </button>
      </Offcanvas>
    </>
  );
}
