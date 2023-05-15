import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPhone,
  faPhoneSlash,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import { imageShow, videoShow } from "../../utils/imagesShow";
import { deleteMessages } from "../../redux/actions/messageActions";

import Times from "./Times";
import Avatar from "../Avatar/Avatar";

const MessageDisplay = ({ user, msg, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };

  return (
    <>
      <div className="content_chat_container">
        <div className="chat_title">
          <Avatar src={user.avatar} size="small-avatar" />
        </div>

        <div className="you_content">
          {user._id === auth.user._id && (
            <FontAwesomeIcon icon={faTrash} onClick={handleDeleteMessages} />
          )}

          <div>
            {msg.text && <div className="chat_text">{msg.text}</div>}
            {msg.media.map((item, index) => (
              <div key={index}>
                {item.url.match(/video/i)
                  ? videoShow(item.url)
                  : imageShow(item.url)}
              </div>
            ))}
          </div>

          {msg.call && (
            <div
              style={{
                display: "flex",
                background: "#eee",
                width: "185px",
                height: "50px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  background: "white",
                  margin: "auto 10px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  borderRadius: "50px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={
                    msg.call.times === 0
                      ? msg.call.video
                        ? faVideoSlash
                        : faPhoneSlash
                      : msg.call.video
                      ? faVideo
                      : faPhone
                  }
                  size="lg"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "auto auto auto 0",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: msg.call.times === 0 ? "crimson" : "green",
                  }}
                >
                  {msg.call.times === 0
                    ? msg.call.video
                      ? "Cuộc gọi video lỡ"
                      : "Cuộc gọi thoại lỡ"
                    : msg.call.video
                    ? "Cuộc gọi video"
                    : "Cuộc gọi thoại"}
                </span>
                <div className="text-left">
                  <small>
                    {msg.call.times > 0 && <Times total={msg.call.times} />}
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="chat_time">
        {moment(msg.createdAt).format("DD/MM/YYYY HH:MM")}
      </div>
    </>
  );
};

export default MessageDisplay;
