import { Modal } from "antd";
import React, { useEffect, useState } from "react";

export default function ModalPop({
  children,
  open,
  title,
  close = () => {},
  width,
}) {
  const [isModalOpen, setIsModalOpen] = useState(open);
  useEffect(() => {
    setIsModalOpen(open);
    // console.log(open);
  }, [open]);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);
  const handleOk = () => {
    close(false);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    close(false);
    setIsModalOpen(false);
  };
  return (
    <Modal
      width={width}
      centered
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={null}
      cancelText={null}
      footer={null}
    >
      {children}
    </Modal>
  );
}
