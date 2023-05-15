import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ProfileOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu, Button } from "antd";

import { logout } from "../../redux/actions/authActions";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getAPI } from "../../utils/fetchAPI";
import SVG from "react-inlinesvg";
// import SpinLoader from "../Loading/SpinLoader";
import UserCard from "../UserCard/UserCard";
import Notification from "../Notification/Notification";
import { useAppContext } from "../../App";
import Splash from "../Loading/Splash";
import { faSun } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  const { themeDark, setThemeDark } = useAppContext();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Trang cá nhân", "sub1", <ProfileOutlined />),
    // getItem("Đổi mật khẩu", "sub2", <KeyOutlined />),
    // getItem("Cài đặt", "sub3", <SettingOutlined />),
    getItem(
      themeDark === "true" ? "Chế độ sáng" : "Chế độ tối",
      "sub2",
      themeDark === "true" ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )
    ),
    getItem("Đăng xuất", "sub4", <LogoutOutlined />),
  ];

  const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5"];

  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [checkLogout, setCheckLogout] = useState(false);
  const [isShowProfile, setIsShowProfile] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!search) return;

      try {
        setLoad(true);
        const res = await getAPI(`search?username=${search}`, auth.token);
        setUsers(res.data.searchResult);
        setLoad(false);
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, auth.token, dispatch]);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const handleClick = (e) => {
    if (e.key === "sub1") {
      navigate(`/profile/${auth.user._id}`);
      setIsShowProfile(false);
      setBtnActiveHeader("");
    }
    // if (e.key === "sub2") navigate("/password");
    // if (e.key === "sub3") navigate("/setting");
    else if (e.key === "sub4")
      dispatch({ type: GLOBALTYPES.CONFIRM, payload: { action: "Đăng xuất" } });
    else if (e.key === "sub2") {
      document.querySelector("body").style.transition = "all 0.3s ease-in-out";
      localStorage.setItem(
        "theme-dark",
        themeDark === "true" ? "false" : "true"
      );
      if (themeDark === "true")
        document.querySelector("body").removeAttribute("data-theme");
      else document.querySelector("body").setAttribute("data-theme", `dark`);
      setThemeDark(themeDark === "true" ? "false" : "true");
      setIsShowProfile(false);
    }
  };
  const { btnActiveHeader, setBtnActiveHeader } = useAppContext();
  const handleFocus = () => {
    setIsShowNotification(false);
    setIsShowProfile(false);
  };

  const handleLogo = () => {
    window.scrollTo({ top: 0 });
    navigate("/");
    setBtnActiveHeader("");
  };

  const handleNotification = () => {
    setIsShowProfile(false);
    setIsShowNotification(!isShowNotification);
  };

  const handleProfile = () => {
    setIsShowNotification(false);
    setIsShowProfile(!isShowProfile);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
            height="50x"
            width="50px"
            onClick={handleLogo}
          />
        </Link>
      </div>
      <form className="search-form">
        <div className="search_input">
          <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
            }
            onFocus={handleFocus}
          />
          <div className="search_loader">
            {load && <FontAwesomeIcon icon={faSpinner} spin />}
          </div>
        </div>

        <div className="users_search_result">
          {search &&
            users.map((user) => (
              <UserCard key={user._id} user={user} handleClose={handleClose} />
            ))}
        </div>
      </form>
      <div className="menu">
        <button
          className={`btn-discover ${
            btnActiveHeader === "explore" ? "active" : ""
          }`}
          onClick={(e) => {
            setBtnActiveHeader("explore");
            navigate("/explore");
          }}
          title="explore"
        >
          <SVG
            className="explore-icon"
            src={process.env.PUBLIC_URL + "/icons/explore.svg"}
            alt="explore"
          />
        </button>
        <button
          className={`btn-message ${
            btnActiveHeader === "messenger" ? "active" : ""
          }`}
          onClick={() => {
            setBtnActiveHeader("messenger");
            navigate("/message");
          }}
        >
          <SVG
            className="messenger-icon"
            src={process.env.PUBLIC_URL + "/icons/facebook-messenger.svg"}
            alt="messenger"
          />
        </button>
        <button
          className={`btn-notification ${isShowNotification ? "active" : ""}`}
          onClick={() => {
            handleNotification();
          }}
        >
          <SVG
            className="notifications-icon"
            src={process.env.PUBLIC_URL + "/icons/notifications.svg"}
            alt="notifications"
          />
          {notify.data.filter((el) => !el.isRead).length > 0 && (
            <div className="notify-number">
              {notify.data.filter((el) => !el.isRead).length}
            </div>
          )}
        </button>
        {isShowNotification && (
          <Notification style={{ position: "absolute", top: "85%" }} />
        )}

        {auth.token ? (
          <div className="container-menu">
            <img
              className="profile"
              src={auth.user.avatar}
              alt="avatar"
              onClick={handleProfile}
            ></img>
            {isShowProfile && (
              <Menu
                className="menu-profile"
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={(e) => handleClick(e)}
                style={{
                  width: 256,
                }}
                items={items}
              />
            )}
          </div>
        ) : (
          <Splash />
        )}
        {checkLogout && (
          <div className="back-form">
            <div className="modal-form"></div>
            <div className="container-logout">
              <p>Bạn muốn đăng xuất ?</p>
              <div className="form-footer">
                <Button
                  type="primary"
                  block
                  className="confirm-logout"
                  onClick={() => dispatch(logout())}
                >
                  Đồng ý
                </Button>
                <Button
                  type="primary"
                  danger
                  className="exit-logout"
                  onClick={() => setCheckLogout(false)}
                >
                  Hủy bỏ
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
