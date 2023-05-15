import React from "react";

import Header from "../../components/Header/Header";
import MessageLeft from "../../components/Message/MessageLeft";
import MessageRight from "../../components/Message/MessageRight";

const Conversation = () => {
  return (
    <>
      <Header />
      <div className="message d-flex">
        <div className="col-2 border-right px-0 left_mess">
          <MessageLeft />
        </div>

        <div className="col-10 px-0">
          <MessageRight />
        </div>
      </div>
    </>
  );
};

export default Conversation;
