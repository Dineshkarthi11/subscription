import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DrawerPop from "../common/DrawerPop";
import SearchBox from "../common/SearchBox";

import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;
const progress = [
    {
        id: 1,
        name: "Shortlisted",
        count: 24,
    },
    {
        id: 2,
        name: "Offer Sent",
        count: 15,
    },

    {
        id: 3,
        name: "Offer Accepted",
        count: 10,
    },

    {
        id: 4,
        name: "Offer Declined",
        count: 4,
    },

    {
        id: 5,
        name: "Hired",
        count: 2,
    },
];

const dateAdded = [
    {
        id: 1,
        name: "More Than",
    },
    {
        id: 2,
        name: "Exactly",
    },

    {
        id: 3,
        name: "Less Than",
    },

    {
        id: 4,
        name: "After",
    },

    {
        id: 5,
        name: "Before",
    },
];






export default function FilterDrawer({ open, close = () => { }, colors }) {
    // console.log(colors);
    const primaryColor = localStorage.getItem("mainColor");
    const { t } = useTranslation();
    const [show, setShow] = useState(open);
    const [checkedList, setCheckedList] = useState(progress); //Check box 1
    const [checkedList2, setCheckedList2] = useState(dateAdded); //Check box 2

    //   Check Box 1
    const totalProgressCount = progress.reduce((total, item) => total + item.count, 0);
    const checkAll = checkedList.length === progress.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < progress.length;

    const onChange = (list) => {
        setCheckedList(list);
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? progress : []);
    };

    //   CheckBox 2
    const checkAll2 = checkedList2.length === dateAdded.length;
    const indeterminate2 = checkedList2.length > 0 && checkedList2.length < dateAdded.length;

    const onChange2 = (list) => {
        setCheckedList2(list);
    };

    const onCheckAllChange2 = (e) => {
        setCheckedList2(e.target.checked ? dateAdded : []);
    };



    const handleClose = () => {
        setShow(false);
        close(false);
    };
    const dynamicColors = progress.map(
        (_, index) => colors[index % colors.length]
    );
    return (
        <DrawerPop
            open={show}
            close={(e) => {
                handleClose();
            }}
            contentWrapperStyle={{
                width: "410px",
            }}
            handleSubmit={(e) => { }}
            updateFun={() => { }}
            header={["Apply Filters", "Lorem ipsum dolor sit amet, consectetur."]}
            footerBtn={["Cancel", "Done"]}
        >
            <div className="relative flex flex-col w-full h-full gap-6">
                <div className="flex flex-col gap-2">
                    <label className="para !text-black dark:!text-white font-semibold">
                        Calendar Filters
                    </label>
                    <SearchBox placeholder="Search" />
                </div>

                {/* CheckBox Group 1  */}
                <div className="flex flex-col gap-2">
                    <label className="para !text-black dark:!text-white font-semibold">
                        Progress
                    </label>
                    <div className="flex flex-col gap-1">
                        <div
                            className={`flex justify-between py-2.5 px-1.5 rounded-lg hover:bg-[${primaryColor}30] cursor-pointer`}
                        >
                            <label className="flex items-center gap-2">
                                <Checkbox
                                    indeterminate={indeterminate}
                                    onChange={onCheckAllChange}
                                    checked={checkAll}
                                />
                                <span
                                    className="para px-2.5 py-1 rounded-2xl justify-center items-center flex text-sm font-medium leading-tight text-center"
                                    style={{
                                        backgroundColor: `${primaryColor}30`,
                                        color: primaryColor,
                                    }}
                                >
                                    Show all
                                </span>
                            </label>
                            <p className="para !text-primary">{totalProgressCount}</p>
                        </div>

                        {progress.map((option) => (
                            <div
                                key={option.id}
                                className={`flex justify-between py-2.5 px-1.5 rounded-lg hover:bg-[${primaryColor}30] cursor-pointer`}
                            >
                                <label className="flex items-center gap-2">
                                    <Checkbox
                                        value={option.id}
                                        checked={checkedList.some(item => item.id === option.id)}
                                        onChange={(e) =>
                                            onChange(
                                                e.target.checked
                                                    ? [...checkedList, option]
                                                    : checkedList.filter((item) => item.id !== option.id)
                                            )
                                        }
                                    />
                                    <p
                                        className=" para px-2.5 py-1 rounded-2xl justify-center items-center flex text-sm font-medium leading-tight text-center"
                                        style={{
                                            backgroundColor: `${dynamicColors[option.id % colors.length]}30`,
                                            color: dynamicColors[option.id % colors.length],
                                        }}
                                    >
                                        {option.name}
                                    </p>
                                </label>
                                <p className="para" style={{
                                    color: dynamicColors[option.id % colors.length],
                                }}>{option.count}</p>
                            </div>
                        ))}
                    </div>
                </div>


                {/* CheckBox Group 2 */}
                <div className="flex flex-col gap-2">
                    <label className="para !text-black dark:!text-white font-semibold">
                        Date Added
                    </label>
                    <div className="flex flex-col gap-1">
                        <div
                            className={`flex justify-between py-2.5 px-1.5 rounded-lg hover:bg-[${primaryColor}30] cursor-pointer`}
                        >
                            <label className="flex items-center gap-2">
                                <Checkbox
                                    indeterminate={indeterminate2}
                                    onChange={onCheckAllChange2}
                                    checked={checkAll2}
                                />
                                <span
                                    className="para"
                                >
                                    Show all
                                </span>
                            </label>
                        </div>

                        {dateAdded.map((option) => (
                            <div
                                key={option.id}
                                className={`flex justify-between py-2.5 px-1.5 rounded-lg cursor-pointer`}
                            >
                                <label className="flex items-center gap-2">
                                    <Checkbox
                                        value={option.id}
                                        checked={checkedList2.some(item => item.id === option.id)}
                                        onChange={(e) =>
                                            onChange2(
                                                e.target.checked
                                                    ? [...checkedList2, option]
                                                    : checkedList2.filter((item) => item.id !== option.id)
                                            )
                                        }
                                    />
                                    <p
                                        className=" para !text-black dark:!text-white"
                                    >
                                        {option.name}
                                    </p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </DrawerPop>
    );
}