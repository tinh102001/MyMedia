import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { POST_TYPES } from "../redux/actions/postActions";
import { getAPI } from "../utils/fetchAPI";

import Status from "../components/Status/Status";
import Header from "../components/Header/Header";
import Alert from "../components/Alert/Alert";
import PostCard from "../components/PostCard/PostCard";
import SkeletonLoader from "../components/Loading/SkeletonLoader";

import Left from "../components/Sidebar/Left";
import Right from "../components/Sidebar/Right";

const HomePage = () => {
  const { auth, homePosts } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = useCallback(async () => {
    setLoad(true);
    const res = await getAPI(`posts?limit=${homePosts.page * 6}`, auth.token);
    if (res.data.posts.length === res.data.totalPosts) setHasMore(false);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoad(false);
  }, [homePosts.page, auth.token, dispatch]);

  useEffect(() => {
    const onScroll = async function () {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasMore
      ) {
        handleLoadMore();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleLoadMore, hasMore]);

  return (
    <div className="home-page-wrapper">
      <Header />
      <Alert />
      <div className="container-fluid">
        <div className="flex-xl-nowrap row">
          <Left />
          <div className="container-content col-xl-6 col-md-9 col-12">
            <Status />
            {homePosts.loading ? (
              <SkeletonLoader />
            ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
              <h2
                className="text-center"
                style={{ height: "360px", margin: "50px auto" }}
              >
                Không có bài viết nào!
              </h2>
            ) : (
              <PostCard posts={homePosts.posts} />
            )}
            {load && <SkeletonLoader />}
            {!hasMore && (
              <div
                style={{
                  margin: "20px auto",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Đã hiển thị hết các bài viết
              </div>
            )}
          </div>
          <Right />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
