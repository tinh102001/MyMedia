import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  EXPLORE_TYPES,
  getExplorePosts,
} from "../redux/actions/exploreActions";
import { getAPI } from "../utils/fetchAPI";

import SpinLoader from "../components/Loading/SpinLoader";
import Header from "../components/Header/Header";
import Alert from "../components/Alert/Alert";
import PostGallery from "../components/PostGallery/PostGallery";
import Splash from "../components/Loading/Splash";

const Explore = () => {
  const { auth, explore } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!explore.firstLoad) {
      dispatch(getExplorePosts(auth.token));
    }
  }, [dispatch, auth.token, explore.firstLoad]);

  const handleLoadMore = useCallback(async () => {
    setLoad(true);
    const res = await getAPI(
      `explore_posts?num=${explore.page * 9}`,
      auth.token
    );
    dispatch({ type: EXPLORE_TYPES.UPDATE_POST, payload: res.data });
    setLoad(false);
  }, [auth.token, dispatch, explore.page]);

  useEffect(() => {
    const onScroll = async function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        handleLoadMore();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleLoadMore]);

  return (
    <div className="my-profile-warper">
      <Header />
      <Alert />
      <div>
        {auth.token ? <PostGallery posts={explore.posts} result={explore.result}/> : <SpinLoader />}
      </div>
      {load && <Splash />}
    </div>
  );
};

export default Explore;
