import React from "react";

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}
    >
      <div
        className={`toast-header text-light justify-content-between ${bgColor}`}
      >
        <strong className="mr-auto text-light" style={{ fontSize: "1.2em" }}>
          {msg.title}
        </strong>
        <button
          className={`ml-2 mb-1 close ${bgColor} text-light`}
          data-dismiss="toast"
          style={{ outline: "none", border: "none", fontSize: "1.2em" }}
          onClick={handleShow}
        >
          X
        </button>
      </div>
      <div className="toast-body" style={{ fontSize: "1.2em" }}>
        {msg.body}
      </div>
    </div>
  );
};

export default Toast;
