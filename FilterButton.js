import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useMediaQuery } from "react-responsive";
import { BiSliderAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import ButtonClick from "./Button";
// import FilterDrawer from "../Jobs/FilterDrawer";

export const FilterBtn = ({ colors = [] }) => {
  const { t } = useTranslation();

  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      {/* <Button
        className="flex items-center justify-center h-full font-medium bg-white dark:bg-black dark:text-white flex-nowrap"
        onClick={(e) => {
          handleShow(true);
        }}
        size={isSmallScreen ? "default" : "large"}
      >
        <span className="mr-2">{t("Filters")}</span>
        <span className="ml-auto">
          <BiSliderAlt className="text-base 2xl:text-lg" />
        </span>
      </Button> */}
      <ButtonClick handleSubmit={handleShow}>
      <span className="mr-2">{t("Filters")}</span>
        <span className="ml-auto">
          <BiSliderAlt className="text-base 2xl:text-lg" />
        </span>
      </ButtonClick>
      {/* {show && (
        <FilterDrawer
          colors={colors}
          open={show}
          close={(e) => {
            setShow(false);
          }}
        />
      )} */}
    </>
  );
};