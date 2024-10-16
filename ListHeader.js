import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import Arrow_Top from "../../assets/images/Vector.svg";
import Arrow_Bottom from "../../assets/images/Vector_bottom.svg";
import img from "../../assets/images/Rectangle 363.png";
import { useTranslation } from "react-i18next";

export default function ListHeader({
  path = [],
  companyList = true,

  navigateBtn = [],
  navigationClick = () => {},
  buttonClick = () => {},
}) {
  const { t } = useTranslation();

  return (
    <div className="">
      <div className="md:grid grid-cols-10 gap-5  justify-between items-center px-4 pt-5 pb-4">
        <div className=" col-span-6 block ">
          <div className="flex items-center pb-1">
            <h3 className="text-sm mb-0">{path[0]} </h3>
            <IoIosArrowForward className="opacity-70 text-lg" />
            <h3 className="text-[20px] mb-0"> {path[1]}</h3>
          </div>
          <p className="mb-0 text-[11px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt,
            saepe.
          </p>
        </div>
        <div className="flex col-span-4 justify-end">
          {companyList && (
            <button className=" p-2 md:px-4">
              <div className="company_list flex items-center justify-between ">
                <div className="flex items-center justify-evenly">
                  <img src={img} alt="" className=" w-10 p-1" />
                  <div className="block ">
                    <p className="mb-0 text-xs text-center p-0">Company 1</p>
                  </div>
                </div>
                <div className=" pr-2">
                  <img src={Arrow_Top} alt="" className="pb-1 px-2" />
                  <img src={Arrow_Bottom} alt="" className="px-2" />
                </div>
              </div>
            </button>
          )}
          <div className=" flex items-center">
            <button
              type="submit"
              className="p-2 border rounded-md pl-5 bg-primary text-white text-xs"
              onClick={() => {
                // console.log("worked");
                buttonClick(true);
              }}
            >
              <span className="m-1 text-md">+</span> Add {path[1]}
            </button>
          </div>
        </div>
      </div>
      {navigateBtn && (
        <div className="md:flex justify-start items-center px-4 py-2 gap-2 ">
          <div className="border rounded-lg p-2 w-full md:flex justify-start items-center  gap-2 ">
            {navigateBtn.map((each, i) => (
              <button
                key={i}
                className={` bg-primary   rounded-lg   text-white px-3 py-1`}
                onClick={() => {
                  navigationClick(each.value);
                }}
              >
                {each.title}
              </button>
            ))}
            {/* <button>Others</button> */}
          </div>
        </div>
      )}
    </div>
  );
}
