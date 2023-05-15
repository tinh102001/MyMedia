import React from "react";

import Header from "../../components/Header/Header";
import MessageLeft from "../../components/Message/MessageLeft";

const Message = () => {
  return (
    <>
      <Header />
      <div className="message d-flex">
        <div className="col-2 border-right px-0">
          <MessageLeft />
        </div>

        <div className="col-10 px-0 right_mess">
          <div
            className="d-flex justify-content-center 
                align-items-center flex-column h-100"
          >
            <i
              className="fab fa-facebook-messenger text-primary"
              style={{ fontSize: "5rem" }}
            />
            <h4>Messenger</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
