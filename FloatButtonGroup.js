import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { PiMagicWandFill, PiMoon, PiPalette } from 'react-icons/pi';
const FloatButtonGroup = () => (
  <>
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 35,
      }}
      icon={<PiMagicWandFill />}
    >
      <FloatButton tooltip={<div>Documents</div>} />
      <FloatButton tooltip={<div>Theme</div>}  icon={<PiMoon />} />
      <FloatButton tooltip={<div>Theme Editor</div>}  icon={<PiPalette />} />
    </FloatButton.Group>
  </>
);
export default FloatButtonGroup;