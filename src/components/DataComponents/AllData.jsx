"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataPosts, selectDataPosts, selectDataLoading } from "@/store/slices/DataSlice";
import GlobalLoader from "@/components/Global/GlobalLoader";

export default function AllData() {
  const dispatch = useDispatch();
  const posts = useSelector(selectDataPosts);
  const loading = useSelector(selectDataLoading);

  useEffect(() => {
    dispatch(fetchDataPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="container text-center py-5">
        <p>No data found</p>
      </div>
    );
  }

  return (
    <div className="container alldata">
      {posts.map((post) => (
        <div className="row " key={post.id}>
          <div className="col-sm-9">
            <h6>{post?.acf?.new_cases}</h6>
          </div>
          <div className="col-sm-3">
            <h4>{post?.acf?.new_cases_number}</h4>
          </div>

          <div className="col-sm-9">
            <h5>{post?.acf?.population}</h5>
          </div>
          <div className="col-sm-3">
            <h4>{post?.acf?.population_number}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
