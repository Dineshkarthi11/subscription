import { Card, Skeleton } from "antd";
import React from "react";

const CustomSkeleton = ({
  avatar = false,
  title = false,
  rows = {},
  width = {},
  size = {},
  className,
  cardclassName,
  style,
}) => {
  return (
    <Card className={`w-full ${cardclassName}`}>
      <Skeleton
        active
        avatar={avatar}
        paragraph={{ rows, width }}
        title={title}
        size={size}
        loading={true}
        className={className}
        style={style}
      ></Skeleton>
    </Card>
  );
};

export default CustomSkeleton;
