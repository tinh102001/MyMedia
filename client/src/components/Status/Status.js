import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage } from "@fortawesome/free-solid-svg-icons";

import CreatePostModal from "./CreatePostModal";

const Status = () => {
  const { auth, socket } = useSelector((state) => state);
  const [openPostModal, setOpenPostModal] = useState(false);

  const handleClose = () => {
    setOpenPostModal(false);
  };

  return (
    <div className="status_modal">
      <div className="status_body d-flex">
        <img className="avatar" src={auth?.user?.avatar} alt="avatar" />
        <div className="status-input" onClick={() => setOpenPostModal(true)}>
          <span className="status-content">{`${auth?.user?.username} ơi, Bạn đang nghĩ gì thế?`}</span>
        </div>
      </div>
      <div className="status_footer d-flex">
        <div
          className="icon status-image"
          onClick={() => setOpenPostModal(true)}
        >
          <FontAwesomeIcon icon={faImage} />
          <span>Ảnh/video</span>
        </div>
        <div className="icon status-feeling">
          <FontAwesomeIcon icon={faFaceSmile} />
          <span>Cảm xúc</span>
        </div>
      </div>
      <CreatePostModal
        open={openPostModal}
        onClose={handleClose}
        auth={auth}
        socket={socket}
      />
    </div>
  );
};

export default Status;
