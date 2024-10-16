import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

// Define an array of hex color values
const Colors = [
  "#00B23C",
  "#FE4949",
  "#4437CC",
  "#FF8A00",
  "#4976FE",
  "#E0115F",
  "#DFA510",
  "#E546D5",
  "#00E096",
  "#884DFF",
  "#FF4DB8",
];

const Avatar = ({
  image,
  name,
  alt = "Profile",
  className = "",
  randomColor = false,
  textClassName,
}) => {
  // Ref to store the remaining colors
  const remainingColorsRef = useRef([...Colors]);
  // State to store the current background color
  const [bgColor, setBgColor] = useState("");

  // Function to get a random color from the remaining colors
  const getRandomColor = () => {
    // If all colors have been used, reset the remaining colors
    if (remainingColorsRef.current.length === 0) {
      remainingColorsRef.current = [...Colors];
    }
    // Get a random index
    const randomIndex = Math.floor(
      Math.random() * remainingColorsRef.current.length
    );
    // Get the color at the random index
    const color = remainingColorsRef.current[randomIndex];
    // Remove the selected color from the remaining colors
    remainingColorsRef.current.splice(randomIndex, 1);
    return color;
  };

  // Set a random background color if randomColor prop is true
  useEffect(() => {
    if (randomColor) {
      setBgColor(getRandomColor());
    }
  }, [randomColor]);

  return (
    <div
      className={twMerge(
        "size-8 overflow-hidden rounded-full 2xl:size-10 shrink-0 vhcenter bg-primaryalpha/10 dark:bg-primaryalpha/30",
        className
      )}
      // Set background color if randomColor is true
      style={{
        backgroundColor: image ? undefined : randomColor ? bgColor : undefined,
      }}
    >
      {image ? (
        <img
          src={image}
          className="object-cover object-center w-full h-full"
          alt={alt}
        />
      ) : (
        <p
          className={twMerge(
            "font-semibold text-xs 2xl:text-sm text-primaryalpha",
            textClassName
          )}
          // Set text color to white if randomColor is true
          style={{ color: randomColor && "white" }}
        >
          {name?.charAt(0).toUpperCase()}
        </p>
      )}
    </div>
  );
};

export default Avatar;
