import React, { useState, useEffect } from "react";

import DisplayComment from "./DisplayComment";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [next, setNext] = useState(2);
  const [showComments, setShowComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newRep = post.comments.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [post.comments]);

  return (
    <div className="comments-post">
      {showComments.map((comment, index) => (
        <DisplayComment
          key={index}
          comment={comment}
          post={post}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}
      <div className="btn-add-hide-comment">
        {comments.length - next > 0 ? (
          <div onClick={() => setNext(next + 10)}>Xem thêm bình luận...</div>
        ) : (
          comments.length > 2 && (
            <div onClick={() => setNext(2)}>Ẩn bình luận...</div>
          )
        )}
      </div>
    </div>
  );
};

export default Comments;
