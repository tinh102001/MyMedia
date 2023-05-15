import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faBell, faBellSlash } from "@fortawesome/free-regular-svg-icons";

import Avatar from "../Avatar/Avatar";
import moment from "moment";
import {
  isReadNotify,
  NOTIFY_TYPES,
  deleteAllNotifies,
} from "../../redux/actions/notifyActions";

const Notification = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token));

    if (
      window.confirm(
        `Bạn còn ${newArr.length} thông báo chưa đọc. Bạn có muốn xóa tất cả?`
      )
    ) {
      return dispatch(deleteAllNotifies(auth.token));
    }
  };

  return (
    <div className="notification">
      <div style={{ display: "flex", position: "relative", width: " 100%" }}>
        <h3>Thông báo</h3>
        {notify.sound ? (
          <FontAwesomeIcon
            icon={faBell}
            style={{
              fontSize: "1.2rem",
              cursor: "pointer",
              position: "absolute",
              right: "0",
              top: "20%",
            }}
            onClick={handleSound}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBellSlash}
            style={{
              fontSize: "1.2rem",
              cursor: "pointer",
              position: "absolute",
              right: "0",
              top: "20%",
            }}
            onClick={handleSound}
          />
        )}
      </div>
      <hr className="mt-0" />
      <div
        className="btn_delete_all_notification"
        style={{ cursor: "pointer" }}
        onClick={handleDeleteAll}
      >
        <span>Xóa tất cả</span>
      </div>
      {notify.data.length === 0 && <div>Bạn chưa có thông báo nào!</div>}

      <div className="notification_msg">
        {notify.data.map((msg, index) => (
          <div key={index} style={{ margin: "auto" }}>
            <Link
              to={`${msg.url}`}
              onClick={() => handleIsRead(msg)}
              style={{
                display: "flex",
                textDecoration: "none",
                columnGap: "5px",
              }}
            >
              <Avatar src={msg.user.avatar} size="big-avatar" />

              <div className="notification_msg_content">
                <div>
                  <strong>{msg.user.username} </strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
                <small className="notification_status">
                  {moment(msg.createdAt).fromNow()}
                </small>
              </div>
              {!msg.isRead && (
                <FontAwesomeIcon
                  icon={faCircle}
                  size="2xs"
                  style={{ color: "#051ee1", margin: "auto" }}
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
