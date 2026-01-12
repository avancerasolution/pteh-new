"use client";

import { useRef, useState, useEffect, Fragment, Suspense } from "react";
import Header from "@/components/Global/Header";
import Footer from "@/components/Global/Footer";
import GitBanner from "./GitBanner";
import GitDesc from "./GitDesc";

import { useDispatch, useSelector } from "react-redux";
import { fetchGitPosts, selectGitPosts } from "@/store/slices/GitSlice";
import GitContact from "./GitContact";
import GitSupport from "./GitSupport";
import GitDonate from "./GitDonate";
import GitVolunter from "./GitVolunter";
import GitStay from "./GitStay";
import GitFeedback from "./GitFeedback";
import GlobalLoader from "../Global/GlobalLoader";

export default function GitClient() {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const loading = useSelector((state) => state.loader.loading);

  const dispatch = useDispatch();
  const posts = useSelector(selectGitPosts);

  useEffect(() => {
    dispatch(fetchGitPosts());
  }, [dispatch]);

  useEffect(() => {
    const target = sessionStorage.getItem("targetSlide");

    if (target && swiperRef.current) {
      swiperRef.current.slideTo(Number(target));
      sessionStorage.removeItem("targetSlide");
    }
  }, []);

  return (
    <Fragment>
      <Header swiperRef={swiperRef} activeSlide={activeSlide} />

      {!loading && (
        <>
          <Suspense
            fallback={
              <div className="text-center py-5">
                <GlobalLoader />
              </div>
            }
          >
            <GitBanner />
          </Suspense>
          <Suspense
            fallback={
              <div className="text-center py-5">
                <GlobalLoader />
              </div>
            }
          >
            <GitDesc posts={posts} loading={loading} />
          </Suspense>
          <Suspense
            fallback={
              <div className="text-center py-5">
                <GlobalLoader />
              </div>
            }
          >
            <GitContact posts={posts} loading={loading} />
          </Suspense>
          <Suspense
            fallback={
              <div className="text-center py-5">
                <GlobalLoader />
              </div>
            }
          >
            <GitSupport posts={posts} loading={loading} />
          </Suspense>
          <Suspense
            fallback={
              <div className="text-center py-5">
                <GlobalLoader />
              </div>
            }
          >
            <GitDonate posts={posts} loading={loading} />
          </Suspense>
          <Suspense
            fallback={
              <div className="text-center py-5">
                <GlobalLoader />
              </div>
            }
          >
            <GitVolunter posts={posts} loading={loading} />
          </Suspense>
          <Suspense
            fallback={
              <div className="text-center py-5">
                <GlobalLoader />
              </div>
            }
          >
            <GitStay posts={posts} loading={loading} />
          </Suspense>
          <Suspense
            fallback={
              <div className="text-center py-5">
                <GlobalLoader />
              </div>
            }
          >
            <GitFeedback posts={posts} loading={loading} />
          </Suspense>
        </>
      )}

      <Footer />
    </Fragment>
  );
}
