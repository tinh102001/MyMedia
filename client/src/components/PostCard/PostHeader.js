import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import { GLOBALTYPES } from "../../redux/actions/globalTypes";

import CreatePostModal from "../Status/CreatePostModal";

const PostHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [openPostModal, setOpenPostModal] = useState(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(
      `${window.location.href}post/${post._id}`
    );
  };

  const openModal = async (e) => {
    dispatch({
      type: GLOBALTYPES.CONFIRM,
      payload: { post: post, action: "Xoá bài viết" },
    });
  };

  const handlePostClose = () => {
    setOpenPostModal(false);
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  const openPostModalClick = async () => {
    setOpenPostModal(true);
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  return (
    <>
      <CreatePostModal
        open={openPostModal}
        onClose={handlePostClose}
        auth={auth}
        socket={socket}
      />
      <div className="card-header" style={{ padding: " 12px 16px" }}>
        <div className="header-container d-flex align-items-center">
          <Link to={`/profile/${post.user._id}`}>
            <div className="avatar-container">
              <img className="avatar" src={post.user.avatar} alt="avatar" />
            </div>
          </Link>
          <div className="content flex-grow-1">
            <Link
              to={`/profile/${post.user._id}`}
              style={{ textDecoration: "none" }}
            >
              <span className="user-name">{post.user.username}</span>{" "}
            </Link>

            <span className="post-time">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <NavDropdown
            className="nav-dropdown-post"
            title={
              <div className="option-post">
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            }
            id="post-toggle"
          >
            {auth.user._id === post.user._id && (
              <NavDropdown.Item>
                <span onClick={() => openPostModalClick()}>
                  Chỉnh sửa bài viết
                </span>
              </NavDropdown.Item>
            )}
            {auth.user._id === post.user._id && (
              <NavDropdown.Item>
                <span onClick={() => openModal()}>Xoá bài viết</span>
              </NavDropdown.Item>
            )}
            <NavDropdown.Item>
              <span onClick={() => copyUrl()}>Lưu liên kết</span>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <span onClick={() => copyUrl()}>Đi đến bài viết chi tiết</span>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
