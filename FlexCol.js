import { Flex } from "antd";
import React from "react";

export default function FlexCol({ children, className, gap = 24, id, ref }) {
  return (
    <Flex
      id={id}
      gap={gap}
      className={`${className} flex flex-col  dark:text-white`}
      ref={ref}
    >
      {children}
    </Flex>
  );
}
