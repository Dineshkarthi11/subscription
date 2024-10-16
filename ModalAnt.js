import React from "react";
import { Button, Modal } from "antd";
import { lightenColor } from "./lightenColor";
import ButtonClick from "./Button";
import { BorderColor } from "@mui/icons-material";

// ModalAnt component
const ModalAnt = ({
  isVisible,
  onClose,
  title,
  onOk,
  children,
  width = "",
  okText = "OK",
  cancelText = "Cancel",
  showOkButton = true,
  showCancelButton = true,
  showTitle = true,
  showCloseButton = true,
  okButtonClass = "",
  cancelButtonClass = "",
  okButtonType = "primary",
  cancelButtonType = "default",
  footerClass = "",
  centered = false,
  okButtonDanger = false,
  cancelButtonDanger = false,
  className = "",
  padding = "7px",
  customButton,
  dangerAlert = false,
  error = false,
}) => {
  const primaryColor = localStorage.getItem("mainColor");
  const mode = localStorage.getItem("theme");
  const lighterColor = lightenColor(primaryColor, 0.9);

  const classNames = {
    body: ["my-modal-body"],
    mask: ["my-modal-mask"],
    header: ["my-modal-header"],
    footer: ["my-modal-footer"],
    content: ["my-modal-content"],
  };

  const modalStyles = {
    header: {
      background: "transparent",
      // borderLeft: `5px solid ${token.colorPrimary}`,
      // borderRadius: 0,
      // paddingInlineStart: 5,
    },
    body: {
      // boxShadow: 'inset 0 0 5px #999',
      // borderRadius: 5,
    },
    mask: {
      // backdropFilter: 'blur(10px)',
    },
    footer: {
      // borderTop: '1px solid #333   ',
    },
    content: {
      border: "6px solid",
      borderColor: `${mode === "dark" ? "#424242" : "#ffffff"}`,
      padding: padding,
      borderRadius: "20px",
      background: `${
        mode === "dark"
          ? "linear-gradient(rgb(29, 27, 36) 0%, rgb(48, 45, 54) 30.42%, rgb(19 24 39) 99.67%)"
          : dangerAlert && mode !== "dark"
          ? "linear-gradient(184deg, #FFF2F2 4.07%, #FFF 32%, #FFF 96.21%)"
          : `linear-gradient(180deg, ${lighterColor} 0%, rgba(255, 255, 255, 1) 30.42%, rgba(255, 255, 255, 1) 99.67%)`
      } `,
    },
  };

  const footer = [
    [
      showCancelButton && (
        <ButtonClick
          key={"cancel"}
          className={cancelButtonClass}
          BtnType={cancelButtonType}
          buttonName={cancelText}
          handleSubmit={onClose}
          danger={cancelButtonDanger}
        />
      ),
      showOkButton && (
        <ButtonClick
          key={"ok"}
          className={okButtonClass}
          BtnType={okButtonType}
          buttonName={okText}
          danger={okButtonDanger}
          // handleSubmit={onClose}
          handleSubmit={() => {
            onOk();
          }}
        />
      ),
    ],
  ].filter(Boolean);

  return (
    <Modal
      title={showTitle ? title : null}
      open={isVisible}
      onCancel={onClose}
      width={width}
      footer={
        footer.length ? (
          <div className={`flex items-center justify-end gap-3 ${footerClass}`}>
            {customButton ? <>{customButton}</> : footer}
          </div>
        ) : null
      }
      centered={centered}
      classNames={classNames}
      styles={modalStyles}
      closeIcon={showCloseButton ? undefined : <></>} // Hide close icon
    >
      <div className={`${className}`}>{children}</div>
    </Modal>
  );
};

export default ModalAnt;
