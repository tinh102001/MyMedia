import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../Avatar/Avatar";

const UserCard = ({ user, handleClose, children }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };

  return (
    <div
      className="user_card_container"
      style={{ border: "none", padding: "10px" }}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          style={{ display: "flex", textDecoration: "none" }}
        >
          <Avatar src={user.avatar} size="big-avatar" />

          <div
            className="user_card_info"
            style={{ transform: "translateY(-2px)", marginLeft: "10px" }}
          >
            <span className="user_card_info_username">{user.username}</span>
            <span className="user_card_info_fullname">{user.fullname}</span>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
