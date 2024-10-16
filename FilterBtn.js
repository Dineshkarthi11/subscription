import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useMediaQuery } from "react-responsive";
import { BiSliderAlt } from "react-icons/bi";
import FilterDrawer from "./FilterDrawer";

export const FilterBtn = ({ colors = [] }) => {
    const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };

    return (
        <>
            <Button
                className="flex items-center justify-center h-full font-medium bg-white dark:bg-black dark:text-white flex-nowrap"
                onClick={(e) => {
                    handleShow(true);
                }}
                size={isSmallScreen ? "default" : "large"}
            >
                <span className="mr-2">Filters</span>
                <span className="ml-auto">
                    <BiSliderAlt className="text-base 2xl:text-lg" />
                </span>
            </Button>
            {show && (
                <FilterDrawer
                    colors={colors}
                    open={show}
                    close={(e) => {
                        setShow(false);
                    }}
                />
            )}
        </>
    );
};