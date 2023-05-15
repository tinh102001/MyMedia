import React from "react";

const SaveButton = ({ isSaved, handleSavePost, handleUnSavePost }) => {
  return (
    <>
      {isSaved ? (
        <button onClick={handleUnSavePost}>UnSave</button>
      ) : (
        <button onClick={handleSavePost}>Save</button>
      )}
    </>
  );
};

export default SaveButton;
