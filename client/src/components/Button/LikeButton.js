import React from "react";

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {isLike ? (
        <button onClick={handleUnLike}>Unlike</button>
      ) : (
        <button onClick={handleLike}>Like</button>
      )}
    </>
  );
};

export default LikeButton;
