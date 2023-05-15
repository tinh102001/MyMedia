import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentEditable from "react-contenteditable";

import { createComment } from "../../redux/actions/commentActions";

const InputComment = ({ post, children, onReply, setOnReply }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [editable, setEditable] = useState(false);

  const refUserName = useRef();
  const refInput = useRef();
  const refInputContainer = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.innerHTML.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }
    setContent("");
    const newComment = {
      content: e.target.innerHTML,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth, socket }));
    if (setOnReply) return setOnReply(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditable(false);
    }
  };

  const pasteAsPlainText = (evt) => {
    evt.preventDefault();
    let text = evt.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  useEffect(() => {
    if (onReply && refInput.current) {
      if (refInputContainer.current && refUserName.current) {
        refInputContainer.current.style.paddingLeft = `${
          refUserName.current.clientWidth + 8
        }px`;
        refInput.current.el.current.focus();
      }
    }
  }, [onReply]);

  return (
    <div className="container-comment">
      <img className="avatar" src={auth.user.avatar} alt="avatar" />
      {children}
      <div className={`input-container ${onReply ? "feedback" : ""}`}>
        <div className="input-comment" ref={refInputContainer}>
          <ContentEditable
            id={"comment-input"}
            className="comment-input"
            contentEditable={editable}
            placeholder={onReply ? "" : "Viết bình luận công khai"}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            ref={refInput}
            onPaste={pasteAsPlainText}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            // value={content}
            html={content}
          />
        </div>
        {onReply && (
          <span className="user-name-feedback" ref={refUserName}>
            {onReply.user.username}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputComment;
