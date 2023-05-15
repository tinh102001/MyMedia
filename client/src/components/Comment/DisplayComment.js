import React, { useState, useEffect } from "react";

import CommentCard from "./CommentCard";

const DisplayComment = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);
  return (
    <div className="comment-container">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="comments">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          <div className="btn-add-hide-comment">
            {replyCm.length - next > 0 ? (
              <div onClick={() => setNext(next + 10)}>Xem thêm phản hồi...</div>
            ) : (
              replyCm.length > 1 && (
                <div onClick={() => setNext(1)}>Ẩn phản hồi...</div>
              )
            )}
          </div>
        </div>
      </CommentCard>
    </div>
  );
};

export default DisplayComment;
