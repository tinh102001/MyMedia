import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/actions/postActions";

import Header from "../components/Header/Header";
import PostCard from "../components/PostCard/PostCard";
import SkeletonLoader from "../components/Loading/SkeletonLoader";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const { auth, detailPost } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));

    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      let newData = newArr.filter(
        (ele, ind) =>
          ind ===
          newArr.findIndex(
            (elem) => elem.jobid === ele.jobid && elem.id === ele.id
          )
      );
      setPost(newData);
    }
  }, [detailPost, dispatch, id, auth]);

  return (
    <div className="post-detail-warper">
      <Header />
      {post.length !== 0 ? <PostCard posts={post} /> : <SkeletonLoader />}
    </div>
  );
};

export default PostDetail;
