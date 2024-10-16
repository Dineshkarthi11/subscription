import { Flex } from "antd";
import React from "react";

export default function ProfileHead({ employeeDetails, date }) {
  return (
    <Flex justify="space-between">
      <Flex gap={16} align="center">
        <h1 className="relative flex items-center justify-center w-16 h-16 text-xl font-semibold rounded-full  bg-primaryLight text-primary">
          {employeeDetails?.employeeName.charAt(0).toUpperCase()}
          {/* <div className="absolute right-0 w-4 h-4 border-2 border-white rounded-full  bottom-1 bg-green"></div> */}
        </h1>

        <div>
          <h1 className="h1">
            {employeeDetails?.employeeName.charAt(0).toUpperCase() +
              employeeDetails?.employeeName?.slice(1)}
          </h1>
          <p className="para">{employeeDetails?.email}</p>
        </div>
      </Flex>
      <Flex
        gap={4}
        //   className=" px-3 py-1 rounded-full bg-[#F2F4F7] text-grey h-fit text-sm font-medium"
        align="center"
      >
        {/* <FiClock /> */}
        <p className="flex gap-2 text-xs font-medium  text-grey">
          <span>Date :</span>
          <span> {date}</span>
        </p>
      </Flex>
    </Flex>
  );
}
