import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { deletePost } from "../../redux/actions/postActions";
import { logout } from "../../redux/actions/authActions";
import { deleteComment } from "../../redux/actions/commentActions";

const ConfirmModal = () => {
  const { auth, confirmModal, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const post = confirmModal.post;
  const comment = confirmModal.comment;

  const onConfirm = () => {
    switch (confirmModal.action) {
      case "Xoá bài viết":
        dispatch(deletePost({ post, auth }));
        dispatch({ type: GLOBALTYPES.CONFIRM, payload: false });
        break;
      case "Xoá bình luận":
        dispatch(deleteComment({ post, comment, auth, socket }));
        dispatch({ type: GLOBALTYPES.CONFIRM, payload: false });
        break;
      case "Đăng xuất":
        dispatch(logout());
        break;
      default:
    }
  };

  return (
    <>
      <Modal show={confirmModal ? true : false} centered backdrop="static" className="modal-confirm">
        <Modal.Header>
          <Modal.Title>{confirmModal.action}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn {confirmModal.action} không ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() =>
              dispatch({ type: GLOBALTYPES.CONFIRM, payload: false })
            }
          >
            Đóng
          </Button>
          <Button variant="primary" onClick={() => onConfirm()}>
            {confirmModal.action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;
