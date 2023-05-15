import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => {
  return (
    <div className="skeleton_loader">
      <div className="d-flex align-items-center gap-3">
        <Skeleton
          style={{
            margin: "10px 0 0 10px",
          }}
          baseColor="#bfbfbf"
          highlightColor="#e6e6e6"
          circle="true"
          height={50}
          width={50}
        />
        <Skeleton
          count={2}
          baseColor="#bfbfbf"
          highlightColor="#e6e6e6"
          width={70}
        />
      </div>

      <br />
      <Skeleton height={200} baseColor="#bfbfbf" highlightColor="#e6e6e6" />
      <br />

      <div className="d-flex justify-content-around">
        <Skeleton width={100} baseColor="#bfbfbf" highlightColor="#e6e6e6" />
        <Skeleton width={100} baseColor="#bfbfbf" highlightColor="#e6e6e6" />
        <Skeleton width={100} baseColor="#bfbfbf" highlightColor="#e6e6e6" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
