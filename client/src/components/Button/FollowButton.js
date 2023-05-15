import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/actions/profileActions";

const FollowButton = ({ user }) => {
  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [followed, setFollowed] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <span
          style={{ fontSize: 14, cursor: "pointer" }}
          className="unfollow"
          onClick={handleUnFollow}
        >
          UnFollow
        </span>
      ) : (
        <span
          style={{ color: "#0095F6", fontSize: 14, cursor: "pointer" }}
          className="follow"
          onClick={handleFollow}
        >
          Follow
        </span>
      )}
    </>
  );
};

export default FollowButton;
