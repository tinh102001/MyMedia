import React from "react";
import Avatar from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const UserCardListMessage = ({ user, children, msg }) => {
  const showMsg = (user) => {
    return (
      <>
        <div>{user.text}</div>
        {user.media.length > 0 && (
          <div>
            {user.media.length} <FontAwesomeIcon icon={faImage} />
          </div>
        )}

        {user.call && (
          <span className="material-icons">
            {user.call.times === 0
              ? user.call.video
                ? "Cuộc gọi video lỡ"
                : "Cuộc gọi thoại lỡ"
              : user.call.video
              ? "Cuộc gọi video"
              : "Cuộc gọi thoại"}
          </span>
        )}
      </>
    );
  };

  return (
    <div className="user_card_mess_list_container">
      <div className="user_list_info">
        <Avatar src={user.avatar} size="big-avatar" />
        <div className="user_list_content">
          <div
            className="user_list_fullname"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span className="full-name">
              {user.fullname}
            </span>
            <small className="notify">
              {msg ? showMsg(user) : user.fullname}
            </small>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default UserCardListMessage;
