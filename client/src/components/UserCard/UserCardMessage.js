import React from "react";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";

const UserCardMessage = ({ user, online, children }) => {
  return (
    <div className="user_card_mess_container">
      <div className="user_info">
        <Link
          to={`/profile/${user._id}`}
          style={{ textDecoration: "none" }}
          className="user_info_path"
        >
          <Avatar src={user.avatar} size="big-avatar" />
          <div className="user_info_column">
            <div className="user_fullname" style={{ fontWeight: "bold" }}>
              {user.fullname}
            </div>
            <div className="user_status">
              {online && online.includes(user._id) ? (
                <div style={{ color: "green" }}>Online</div>
              ) : (
                <div>Offline</div>
              )}
            </div>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCardMessage;
