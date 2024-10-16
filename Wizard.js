import React, { useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import rules from "../../assets/images/rules.svg";
import Vector from "../../assets/images/Vector.png";
import delegate from "../../assets/images/delegate.png";
import Button from "./Button";
import { Affix, Steps } from "antd";
import Breadcrumbs from "./BreadCrumbs";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { t } from "i18next";
import ButtonClick from "./Button";

export default function Wizard({
  children,
  buttonClick = () => { },
  buttonClickCancel = () => { },
  items = [],
  menu = true,
  btnName = "",
  stepsData = [],
  nextStep = 0,
  BreadDescription = "",
  // activeBtn = 0,
}) {
  const [choosePolicies, setChoosePolicies] = useState(1);
  const [chooseNextStep, setChooseNextStep] = useState(0);

  useEffect(() => {
    if (choosePolicies !== nextStep) {
      setChoosePolicies(choosePolicies + 1);
    }
    setChooseNextStep(nextStep);
    //   console.log(stepsData[choosePolicies]?.value, chooseNextStep, "USEeFFERCT");
  }, [nextStep]);

  const policiesMenu = [
    {
      id: 0,
      title: "1.Choose Policies",
      value: 0,
      img: rules,
      icon: (
        <IoIosArrowForward className=" opacity-40 text-base font-semibold" />
      ),
    },
    {
      id: 1,
      title: "2.Set values for Policies",
      value: 1,
      img: Vector,
      icon: (
        <IoIosArrowForward className=" opacity-40 text-base font-semibold" />
      ),
    },
    {
      id: 2,
      title: "3.Assign Policies",
      value: 2,
      img: delegate,
    },
  ];

  return (
    <div className=" bg-white h-full flex flex-col gap-7  dark:bg-black  ">
      <Breadcrumbs items={items} description={BreadDescription} />

      {/* policies Menus */}

      {menu ? (
        <div className="lg:flex  lg:py-4 py-2 border-t border-opacity-50">
          <div className=" md:flex gap-4 items-center dark:text-white">
            {stepsData.map((each, i) => (
              <>
                <div
                  key={i}
                  className={` py-3.5 px-5 ${choosePolicies === each.value
                      ? "bg-[#8770F21A] border-primary"
                      : "border-[#DCDCDC] dark:bg-dark"
                    } flex  lg:justify-start justify-center lg:my-0 my-2 items-center gap-2.5 border  rounded-full`}
                  onClick={() => {
                    // buttonClick(each.value);
                    // setChoosePolicies(each.value);
                  }}
                >
                  <img
                    src={each.img}
                    alt=""
                    className="black w-[18px] h-[21px] fill-green-500"
                  />
                  <p
                    className={`${choosePolicies === each.value
                        ? "text-primary"
                        : " opacity-50"
                      }  text-sm font-medium`}
                  >
                    {each.title}
                  </p>
                </div>
                <div className=" md:visible invisible ">{each.icon}</div>
              </>
            ))}
          </div>
        </div>
      ) : (
        <Steps
          current={choosePolicies}
          percent={50}
          // direction="left"
          labelPlacement="vertical"
          items={stepsData}
          // className=" text-sm font-medium"
          style={{
            // fontSize: 14,
            fontWeight: 600,
          }}
        // percent={75}
        />
      )}
      <div className=" h-full">{children}</div>

      <Affix offsetBottom={0}>
        <div className=" md:flex justify-between items-center rounded-b-xl  py-4 border-t dark:text-white  bg-white dark:bg-dark px-2">
          <div className="">
            <p
              className={`  ${menu ? "md:col-span-2 " : "col-span-6 "
                }  col-span-12 lg:text-sm text-xs font-semibold opacity-50 lg:my-0 my-2`}
            >
              Reset to default
            </p>
          </div>
          <div className=" md:col-span-4 col-span-12 flex lg:justify-start justify-between items-center gap-[18px] lg:my-0 my-2">
            <p className=" xl:text-sm text-xs font-medium">View all policies</p>
            <p className="lg:text-sm text-xs font-medium text-primary py-2  px-3 border border-primary rounded-full dark:bg-black">
              4 Policies Created
            </p>
          </div>

          <div
            className={` flex md:justify-end justify-between    gap-2.5 lg:my-0 my-2`}
          >
            <ButtonClick
              handleSubmit={() => {
                if (choosePolicies > 1) {
                  buttonClickCancel();
                  setChoosePolicies(choosePolicies - 1);
                }
              }}
              buttonName={"Previous"}
              icon={<IoIosArrowBack />}
              className="  border rounded-lg flex items-center 2xl:text-sm text-sm font-semibold dark:bg-black"
            ></ButtonClick>
            <ButtonClick
              handleSubmit={() => {
                // console.log(choosePolicies, nextStep);
                if (choosePolicies < stepsData.length) {
                  buttonClick();
                  if (choosePolicies !== nextStep) {
                    setChoosePolicies(choosePolicies + 1);
                  }
                }
              }}
              type="submit"
              className=" font-semibold  lg:text-sm text-xs  rounded-lg"
              buttonName={btnName ? btnName : "Save & Continue"}
              BtnType="Add"
            ></ButtonClick>
          </div>
        </div>
      </Affix>
    </div>
  );
}
