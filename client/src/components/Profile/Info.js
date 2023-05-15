import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import FollowButton from "../UserFollow/FollowButton";
import UserFollow from "../UserFollow/UserFollow";
import Alert from "../Alert/Alert";
import EditProfile from "./EditProfile";
import Avatar from "../Avatar/Avatar";

const Info = ({ id, auth, profile, dispatch, totalUserPosts }) => {
  const { socket } = useSelector((state) => state);

  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);

  const handleClose = () => {
    setOpenPostModal(false);
  };

  useEffect(() => {
    if (id === auth?.user?._id) {
      setUserData([auth.user]);
    } else {
      const data = profile.users.filter((user) => user._id === id);
      let newData = data.filter(
        (ele, ind) =>
          ind ===
          data.findIndex(
            (elem) => elem.jobid === ele.jobid && elem.id === ele.id
          )
      );
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  const handleClickEvent = () => {
    setIsShowFollowers(false);
    setIsShowFollowing(false);
  };

  const directMessage = (id) => {
    navigate(`/message/${id}`);
  };

  return (
    <div className="info">
      <EditProfile
        open={openPostModal}
        onClose={handleClose}
        auth={auth}
        socket={socket}
      />
      <Alert />
      {userData.map((user) => (
        <div className="myprofile-container" key={user._id}>
          <div className="avatar-container">
            <Avatar src={user.avatar} size="supper-avatar" />
          </div>
          <div className="profile-user-settings">
            <h1 className="profile-user-name">{user.username}</h1>
            {id === auth.user._id ? (
              <Button
                className="btn profile-edit-btn"
                type="primary"
                onClick={() => setOpenPostModal(true)}
              >
                Chỉnh sửa
              </Button>
            ) : (
              <div className="profile-btn">
                <FollowButton user={user} />
                <Button
                  type="primary"
                  onClick={() => directMessage(id)}
                  style={{ marginLeft: "1.5rem" }}
                >
                  Nhắn tin
                </Button>
              </div>
            )}
          </div>
          <div className="profile-stats">
            <ul>
              <li>
                <span className="profile-stat-count">{totalUserPosts}</span> Bài
                viết
              </li>
              <li onClick={() => setIsShowFollowers(true)}>
                <span className="profile-stat-count">
                  {user.followers.length}
                </span>{" "}
                Người theo dõi
              </li>
              <li onClick={() => setIsShowFollowing(true)}>
                <span className="profile-stat-count">
                  {user.following.length}
                </span>{" "}
                Đang theo dõi
              </li>
            </ul>
          </div>
          <div className="profile-bio">
            <div className="fullname">{user.fullname}</div>
            <div className="story">{user.story}</div>
            <div className="website">
              <a href={user.website}>{user.website}</a>
            </div>
          </div>
          {isShowFollowers && (
            <div className="back-form">
              <div className="modal-form"></div>
              <div className="container-form">
                <h3>Người theo dõi</h3>
                <div style={{ height: "200px", overflow: "auto" }}>
                  {user.followers.map((item) => (
                    <UserFollow
                      user={item}
                      event={{ onClick: handleClickEvent }}
                    />
                  ))}
                </div>
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowFollowers(false)}
                  style={{ position: "absolute", right: 10, bottom: 10 }}
                >
                  Thoát
                </Button>
              </div>
            </div>
          )}
          {isShowFollowing && (
            <div className="back-form">
              <div className="modal-form"></div>
              <div className="container-form">
                <h3>Đang theo dõi</h3>
                <div style={{ height: "200px", overflow: "auto" }}>
                  {user.following.map((item) => (
                    <UserFollow
                      user={item}
                      event={{ onClick: handleClickEvent }}
                    />
                  ))}
                </div>
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowFollowing(false)}
                  style={{ position: "absolute", right: 10, bottom: 10 }}
                >
                  Thoát
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
