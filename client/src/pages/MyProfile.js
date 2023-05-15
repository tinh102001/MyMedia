import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { getProfileUsers } from "../redux/actions/profileActions";
import { getAPI } from "../utils/fetchAPI";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

import Header from "../components/Header/Header";
// import SpinLoader from "../components/Loading/SpinLoader";
import PostGallery from "../components/PostGallery/PostGallery";
import Info from "../components/Profile/Info";
import Splash from "../components/Loading/Splash";

const MyProfile = () => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [load, setLoad] = useState(false);
  const [saveTab, setSaveTab] = useState(false);

  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(6);
  const [page, setPage] = useState(0);
  const [totalUserPosts, setTotalUserPosts] = useState(0);

  const [savePosts, setSavePosts] = useState([]);
  const [resultSavedPosts, setResultSavedPosts] = useState(6);
  const [pageSavedPosts, setPageSavedPosts] = useState(2);

  const [selectedItem, setSelectedItem] = useState("item1");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
        setTotalUserPosts(data.totalUserPosts);
      }
    });
  }, [profile.posts, id]);

  useEffect(() => {
    dispatch(getProfileUsers({ id, auth }));
  }, [id, auth, dispatch]);

  useEffect(() => {
    setLoad(true);
    getAPI(`get_save_posts`, auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResultSavedPosts(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      });

    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleClick = (item) => {
    setSelectedItem(item);
    setSaveTab(!saveTab);
    setHasMore(true);
  };

  const handleLoadMore = useCallback(async () => {
    setLoad(true);
    if (!saveTab) {
      const res = await getAPI(
        `user_posts/${id}?limit=${page * 9}`,
        auth.token
      );
      if (res.data.posts.length === res.data.totalUserPosts) setHasMore(false);
      setPage(page + 1);
      setPosts(res.data.posts);
    } else {
      const res = await getAPI(
        `get_save_posts?limit=${pageSavedPosts * 9}`,
        auth.token
      );
      if (res.data.savePosts.length === res.data.totalSavedPosts)
        setHasMore(false);
      setPageSavedPosts(pageSavedPosts + 1);
      setSavePosts(res.data.savePosts);
    }
    setLoad(false);
  }, [auth.token, page, pageSavedPosts, id, saveTab]);

  useEffect(() => {
    const onScroll = async function () {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasMore
      ) {
        handleLoadMore();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleLoadMore, hasMore]);

  return (
    <div className="my-profile-warper">
      <Header />
      <Info
        id={id}
        auth={auth}
        profile={profile}
        dispatch={dispatch}
        totalUserPosts={totalUserPosts}
      />
      <div className="profile-content">
        {auth?.user?._id === id && (
          <div className="profile_tab">
            <Link
              className={selectedItem === "item1" ? "selected" : ""}
              onClick={() => handleClick("item1")}
            >
              Bài viết
            </Link>
            <Link
              className={selectedItem === "item2" ? "selected" : ""}
              onClick={() => handleClick("item2")}
            >
              Đã lưu
            </Link>
          </div>
        )}
        {posts ? (
          <>
            {saveTab ? (
              <PostGallery posts={savePosts} result={resultSavedPosts} />
            ) : (
              <PostGallery posts={posts} result={result} />
            )}
          </>
        ) : (
          <Splash />
        )}
        {load && (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="2xl"
            style={{ position: "absolute", left: "50%" }}
          />
        )}
      </div>
    </div>
  );
};

export default MyProfile;
