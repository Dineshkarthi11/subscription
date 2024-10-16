import React from "react";
import { Progress } from "antd";

const ProgressBar = ({
  percent = 0,
  status = "",
  showInfo = false,
  classname = "",
  strokeColor = "",
}) => (
    <>
      <Progress
        className={classname}
        percent={percent}
        status={status}
        showInfo={showInfo}
        strokeColor={strokeColor}
      />
    </>
)
export default ProgressBar;
