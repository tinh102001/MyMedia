import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieAnimation = (props) => {
  const ref = useRef();
  const { path, speed = 1, width, height } = props;
  useEffect(() => {
    lottie
      .loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: path,
      })
      .setSpeed(speed);
  }, [path, speed]);

  return (
    <div
      className="d-inline-block"
      ref={ref}
      style={{ width: width, height: height }}
    />
  );
};

export default LottieAnimation;