import React, { useState } from 'react';
import { Input,} from 'antd';
import { FiAlertCircle } from "react-icons/fi";
import { FaAsterisk } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

const PasswordInput = ({
    title = "",
    type = "text",
    placeholder = "",
    icon = "",
    className = "",
    change = () => { },
    error = "",  
    description,
    required = false,
    grid = "",
    maxLength = 30,
   value=""
   
}) => {


    const { t } = useTranslation();
    const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
    const [inputValue, setInputValue] = useState(value);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e) => {
        let inputValue = e.target.value;

        if (inputValue.length > maxLength) {

            inputValue = inputValue.slice(0, maxLength);
        }

        change(inputValue);

    };

    // console.log(inputValue,"inputvalue")
    return (
        <div
            className={`flex flex-col ${title ? "gap-2" : "gap-0 items-center"
                } ${grid}`}
        >
            <div className="flex items-center dark:text-white gap-0.5">
                {title && (
                    <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
                        {title}
                    </label>
                )}
                {required && <FaAsterisk className="text-[6px] text-rose-600" />}
            </div>
            <span className={`relative ${className} `}>
                <Input.Password
                    placeholder={t(`Enter ${placeholder}`)}                   
                    prefix={icon && icon}                    
                    size={isSmallScreen ? "default" : "large"}
                    style={
                        error && {
                          boxShadow:
                            "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                        }
                      }
                    onChange={handleChange}
                    value={value}
                    className={`dark:text-white ${error ? 'border-rose-500' : ''}`}
                />
                {error && (
                    <FiAlertCircle
                        className={` absolute top-2.5 right-4 mr-3 transform -translate-y-1/5 text-red-400`}
                    />
                )}
                {error && (
                    <p className=" flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
                        <span className="text-[10px] pl-1 pt-1.5">{error}</span>
                    </p>
                )}
            </span> {description && (
                <p className="2xl:text-sm text-xs font-normal opacity-70 dark:text-white">
                    {description}
                </p>
            )}
        </div>
    );
};
export default PasswordInput;