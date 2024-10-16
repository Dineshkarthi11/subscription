import React, { useState, useEffect } from 'react';

const CustomColor = () => {
  const defaultColor = "#6A4BFC";
  const [color, setColor] = useState(defaultColor);

  const handleColorChange = () => {
    const newColor = "#E42684";
    document.documentElement.style.setProperty("--primary-color", newColor);
    setColor(newColor);
    localStorage.setItem("mainColor", newColor);
  };

  useEffect(() => {
    const storedColor = localStorage.getItem("mainColor") || defaultColor;
    document.documentElement.style.setProperty("--primary-color", storedColor);
    setColor(storedColor);
  }, []);

  return (
    <div>
      <button onClick={handleColorChange} className="px-4 py-2 text-white rounded bg-primary">
        Change Color
      </button>
    </div>
  );
};

export default CustomColor;
