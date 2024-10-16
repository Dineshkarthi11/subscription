import React, { useEffect, useState } from "react";
import { useTheme } from "../../Context/Theme/ThemeContext";
import { PiCheckBold } from "react-icons/pi";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

const ThemeColor = ({ change = () => {}, value }) => {
  const { t } = useTranslation();
  const { changeColor } = useTheme();
  const defaultColor = "#6A4BFC"; // Set the default color here
  const [selectedColor, setSelectedColor] = useState(
    localStorage.getItem("mainColor")
  ); // Default selected color
  useEffect(() => {
    // console.log(localStorage.getItem("mainColor"), "localStorage.getItem");
  }, []);

  useEffect(() => {
    changeColor(value);
    setSelectedColor(value);
  }, [value]);

  const handleColorChange = (color) => {
    changeColor(color);
    setSelectedColor(color);
    // console.log(color);
    change(color);
  };

  const themeColors = [
    { color: "#6A4BFC", name: "Violet" },
    { color: "#EE2E5E", name: "Pink" },
    // { color: "#009900", name: "Green" },
    // { color: "#3F51B5", name: "Blue" },
    // { color: "#F44336", name: "Red" },
    // { color: "#9C27B0", name: "Purple" },
    // { color: "#795548", name: "Brown" },
    // { color: "#673AB7", name: "Indigo" },
  ];

  return (
    <div className="flex items-center md:space-x-4 rtl:gap-4 rtl:space-x-0">
      <p className="hidden text-sm font-medium 2xl:text-lg dark:text-white md:block">
        {t("Choose_Color")}
      </p>

      <div className="flex space-x-4 rtl:gap-4 rtl:space-x-0">
        {themeColors.map((color) => (
          <Tooltip title={color.name} color={color.color} key={color.name}>
            <button
              // key={color.name}
              onClick={() => handleColorChange(color.color)}
              className={`relative flex items-center justify-center border-2 size-8 rounded-full bg-${
                color.color
              } border-white transition-all duration-300 ${
                selectedColor === color.color
                  ? "  shadow-lg shadow-slate-500/40"
                  : ""
              }`}
              style={{ backgroundColor: color.color }}
            >
              {selectedColor === color.color && (
                <PiCheckBold className="text-white" />
              )}
            </button>
          </Tooltip>
        ))}
        {/* <button
          onClick={() => handleColorChange("#6A38EF")}
          className={`relative flex items-center justify-center border-2 size-8 rounded-full bg-[#6A38EF] border-white transition-all duration-300 ${
            selectedColor === "#6A38EF" ? "  shadow-lg shadow-[#6A38EF]/40" : ""
          }`}
        >
          {selectedColor === "#6A38EF" && (
            <PiCheckBold className="text-white" />
          )}
        </button>
        <button
          onClick={() => handleColorChange("#EE2E5E")}
          className={`relative flex items-center justify-center border-2 size-8 rounded-full bg-[#EE2E5E] border-white transition-all duration-300 ${
            selectedColor === "#EE2E5E" ? "  shadow-lg shadow-[#EE2E5E]/40" : ""
          }`}
        >
          {selectedColor === "#EE2E5E" && (
            <PiCheckBold className="text-white" />
          )}
        </button> */}
      </div>
    </div>
  );
};

export default ThemeColor;
