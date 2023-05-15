import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";

const PostGallery = ({ posts, result }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/post/${id}`);
  };

  if (result === 0)
    return <div style={{ margin: "20px auto", textAlign: "center", fontWeight: "bold" }}>Không có bài viết nào</div>;
  return (
    <div className="post_gallery">
      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => handleClick(post._id)}
          className="post_gallery_display"
        >
          {post.images[0].url.match(/video/i) ? (
            <video
              controls
              src={post.images[0].url}
              alt={post.images[0].url}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={post.images[0].url}
              alt={post.images[0].url}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          <div className="post_gallery_details">
            <i>
              <FontAwesomeIcon icon={faThumbsUp} /> {post.likes.length}
            </i>

            <i>
              <FontAwesomeIcon icon={faComment} /> {post.comments.length}
            </i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGallery;
