import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import SVG from "react-inlinesvg";

import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { checkImage } from "../../utils/imagesUpload";
import { editProfileUser } from "../../redux/actions/profileActions";

const { TextArea } = Input;

function EditProfile({ open, onClose, auth }) {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");

  const [userData, setUserData] = useState({
    avatar: auth?.user?.avatar,
    fullname: auth?.user?.fullname,
    mobile: auth?.user?.mobile,
    address: auth?.user?.address,
    story: auth?.user?.story,
    website: auth?.user?.website,
    gender: auth?.user?.gender,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfileUser({ userData, avatar, auth }));

    onClose();
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  return (
    <Modal
      show={open}
      onHide={onClose}
      className="create-post-modal"
      backdrop="static"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <div className="title-create-post">Chỉnh sửa trang cá nhân</div>
          <div
            className="btn btn-exit"
            onClick={() => {
              onClose();
            }}
          >
            <SVG
              src={process.env.PUBLIC_URL + "/icons/XCircle.svg"}
              alt="exit"
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="info_avatar">
            <img
              src={avatar ? URL.createObjectURL(avatar) : auth?.user?.avatar}
              alt="avatar"
            />
            <span>
              <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
              <p>Thay avatar</p>
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changeAvatar}
              />
            </span>
          </div>
          <div className="model-info">
            <div>
              <lable>
                Tên đầy đủ
                <br />
                <Input
                  value={userData.fullname}
                  onChange={(e) =>
                    setUserData({ ...userData, fullname: e.target.value })
                  }
                />
              </lable>
            </div>
            <div>
              <lable>
                Số điện thoại
                <br />
                <Input
                  value={userData.mobile}
                  onChange={(e) =>
                    setUserData({ ...userData, mobile: e.target.value })
                  }
                />
              </lable>
            </div>
            <div>
              <lable>
                Địa chỉ
                <br />
                <TextArea
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                />
              </lable>
            </div>
            <div>
              <lable>
                Tiểu sử
                <br />
                <TextArea
                  value={userData.story}
                  onChange={(e) =>
                    setUserData({ ...userData, story: e.target.value })
                  }
                />
              </lable>
            </div>
            <div>
              <lable>
                Trang web
                <br />
                <Input
                  value={userData.website}
                  onChange={(e) =>
                    setUserData({ ...userData, website: e.target.value })
                  }
                />
              </lable>
            </div>
            <div>
              <lable>
                Giới tính
                <br />
                <Input
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                />
              </lable>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-submit" type="submit">
            Cập nhật
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditProfile;
