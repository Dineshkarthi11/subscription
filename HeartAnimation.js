import React, { useState, useEffect } from "react";

const HeartAnimation = ({
  imageUrl,
  width = 50,
  height = 50,
  animationSteps = 28,
  animationDuration = "0.8s",
  likeCount = 0, // Ensure this is a number
  isLiked = false, // Indicates if the item is already liked
  onToggleLike, // Callback to handle like/dislike action
}) => {
  // State to manage the animation and current like count
  const [animate, setAnimate] = useState(isLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(Number(likeCount)); // Ensure likeCount is a number

  useEffect(() => {
    // Sync animation state with initial like state
    setAnimate(isLiked);
    setCurrentLikeCount(Number(likeCount)); // Ensure the count is a number
  }, [isLiked, likeCount]);

  const toggleAnimation = () => {
    const newLikeState = !animate;
    setAnimate(newLikeState);

    // Adjust the like count based on new like state
    setCurrentLikeCount((prevCount) =>
      newLikeState ? prevCount + 1 : prevCount - 1
    );

    // Trigger the parent callback to handle the like/dislike action
    if (onToggleLike) {
      onToggleLike(newLikeState);
    }
  };

  const heartStyle = {
    backgroundImage: `url(${imageUrl})`,
    height: `${height}px`,
    width: `${width}px`,
    backgroundSize: "2900%",
  };

  const animationStyle = {
    animation: `heart-burst ${animationDuration} steps(${animationSteps}) forwards`,
  };

  return (
    <div className="relative" onClick={toggleAnimation}>
      <div
        className={`HeartAnimation ${animate ? "animate" : ""}`}
        style={animate ? { ...heartStyle, ...animationStyle } : heartStyle}
      />
      {/* {currentLikeCount > 0 && ( */}
      <p className="absolute text-sm font-medium -translate-y-1/2 left-11 top-1/2 2xl:text-base text-grey">
        {currentLikeCount} {/* Ensure the count shows as a number */}
      </p>
      {/* )} */}
    </div>
  );
};

export default HeartAnimation;
