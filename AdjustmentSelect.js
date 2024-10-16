import React from 'react';
import { Select } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { FaAsterisk } from "react-icons/fa";
import { PiCheckLight } from "react-icons/pi";

const handleChange = (value) => {
};

const AdjustmentSelect = ({
    title = "",
    value = null,
    change = () => { },
    options = [],
    error = "",
    placeholder = "",
    className = "",
    onSearch = () => { },
    styles,
    description,
    required = false,
    descriptionTop = "",
    rightIcon = false,
    PopoverContent = {},
    icondropDown = false,
    icon = false,
    image = false,
    disabled = false,
    disableFilterSort = false,
    SelectName = "Select",
}) => {
    const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

    return (
        <div className={`${className} flex flex-col gap-2`}>
            {title && (
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center dark:text-white gap-0.5">
                        <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
                            {title}
                        </label>

                        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
                    </div>
                    {descriptionTop && (
                        <p className="text-xs font-medium opacity-50 dark:text-white">
                            {descriptionTop}
                        </p>
                    )}
                </div>
            )}
        <Select
            // defaultValue="Choose"
            // style={{
            //     width: 200,
            // }}
                placeholder={"Choose" + " " + title}
            status={`${error && "error"}`}
            size={isSmallScreen ? "default" : "large"}
            style={{
                ...styles,
                borderRadius: "8px",
                boxShadow: error
                    ? "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                    : "", // Add box shadow for error
            }}
            onChange={handleChange}
                menuItemSelectedIcon={<PiCheckLight />}
            options={options}
        />
            {error && (
                <p className="flex justify-start items-center my-1 mb-0 text-[10px] text-red-500">
                    <span className="text-[10px] pl-1">{error}</span>
                </p>
            )}
        </div>
    );
};

export default AdjustmentSelect;
