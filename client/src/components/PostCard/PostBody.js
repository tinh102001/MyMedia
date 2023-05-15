import React, { createRef, useRef, useState } from "react";
import { Carousel } from "react-bootstrap";

const PostBody = ({ post }) => {
  const imageRef = useRef();
  const [maxHeight, setMaxHeight] = useState(0);

  const [refImages] = useState(
    Array(post.images.length)
      .fill(null)
      .map(() => createRef())
  );

  const getImageWidth = (link) => {
    let maxHeight = 0;
    refImages.forEach((el, i) => {
      let height =
        (el.current.naturalHeight * imageRef.current.clientHeight) /
        el.current.naturalWidth;
      if (maxHeight < height) maxHeight = height;
    });
    setMaxHeight(maxHeight);
  };

  return (
    <div className="post-body">
      <div className="post-content">{post.content}</div>
      <div
        className="post-images"
        ref={imageRef}
        style={
          maxHeight > 0
            ? {
                height: maxHeight,
              }
            : {}
        }
      >
        <Carousel
          nextIcon={
            <span
              className="carousel-control-next-icon"
              style={{
                display: post.images.length > 1 ? "unset" : "none",
              }}
            ></span>
          }
          prevIcon={
            <span
              className="carousel-control-prev-icon"
              style={{
                display: post.images.length > 1 ? "unset" : "none",
              }}
            ></span>
          }
          interval={null}
        >
          {post.images.map((img, i) => {
            return (
              <Carousel.Item key={i} className="img-post">
                {img.url.match(/video/i) ? (
                  <video
                    controls
                    src={img.url}
                    className="d-block w-100"
                    alt={img.url}
                  />
                ) : (
                  <img
                    src={img.url}
                    alt={img.url}
                    onLoad={() => {
                      getImageWidth();
                    }}
                    ref={refImages[i]}
                  />
                )}
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default PostBody;
