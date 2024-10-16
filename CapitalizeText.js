import React from "react";

const CapitalizeText = ({ text }) => {
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return <span>{capitalizeWords(text)}</span>;
};

export default CapitalizeText;
