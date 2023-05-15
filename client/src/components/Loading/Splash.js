import React from "react";

const Splash = () => {
  return (
    <div className="screen-splash d-flex justify-content-center align-items-center position-fixed w-100 h-100  loading">
      <div className="splash text-center py-5 m-3">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
            width={100}
          />
        </div>

        <div className="text-center">
          <img
            src={process.env.PUBLIC_URL + "/icons/dots.svg"}
            height={50}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Splash;
