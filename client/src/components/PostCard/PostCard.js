import React from "react";

import PostBody from "./PostBody";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import InputComment from "../Comment/InputComment";
import Comments from "../Comment/Comment";

const PostCard = ({ posts }) => {
  return (
    <div className="posts-card">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <PostHeader post={post} />
          <PostBody post={post} />
          <PostFooter post={post} />
          <InputComment post={post} />
          <Comments post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostCard;
