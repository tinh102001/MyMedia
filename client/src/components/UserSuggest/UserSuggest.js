import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

import { getSuggestions } from "../../redux/actions/suggestionsAction";

import Avatar from "../Avatar/Avatar";
import FollowButton from "../Button/FollowButton";
import "./style.scss";

const UserSuggest = ({ users }) => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="user_suggest">
      <div className="header_suggest">
        <span className="title">Gợi ý cho bạn</span>
        {!suggestions.loading ? (
          <FontAwesomeIcon
            icon={faRotateRight}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        ) : (
          <FontAwesomeIcon icon={faRotateRight} spin />
        )}
      </div>

      <div className="content_suggest">
        {users.map((user) => (
          <div key={user._id} className="content_suggest_main">
            <Avatar src={user.avatar} size={"medium-avatar"} />
            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <div className="suggest_user_name">{user.username}</div>
            </Link>
            <FollowButton user={user} className="suggest_follow_btn" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSuggest;
