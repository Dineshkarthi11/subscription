import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "./Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import dummyImage from "../../assets/images/Rectangle 330.png";
import Avatar from "./Avatar";

export default function DrawerPop({
  open,
  children,
  close = () => { },
  placement = "",
  handleSubmit = () => { },
  updateFun = () => { },
  updateBtn = false,
  header = [],
  footerBtn = [],
  width = 830,
  className = "",
  background = "",
  headerRight,
  saveAndContinue = false,
  buttonClick = () => { },
  buttonClickCancel = () => { },
  items = [],
  menu = true,
  btnName = "",
  stepsData = [],
  nextStep = 0,
  activeBtn = 0,
  style = "",
  contentWrapperStyle = "",
  initialBtn = true,
  footerSubmitButton = true,
  avatar = false,
  footerData = "",
  action = () => { },
  footer = true,
  headerTitle = true,
  closable,
  bodyPadding,
  customButton,
  size = "",
  footerBtnDisabled = false,
  src,
  name,
  footerBackButton = false,
  footerBackButtonName = "",
  ClickfooterBackButton = () => { },
}) {
  const { t } = useTranslation();

  const layout = useSelector((state) => state.layout.value);
  const [show, setShow] = useState(open);
  const mode = useSelector((state) => state.layout.mode);

  const drawerStyles = {
    mask: {
      // backdropFilter: "blur(1px)",
    },
    body: {
      backgroundColor: `${mode !== "dark" && background}`,
      padding: `${bodyPadding}`,
    },
  };
  const largeDrawerStyles = {
    position: "absolute",
    height: "100%",
    top: 0,
    // left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    borderRadius: 0,
    borderTopLeftRadius: "0px !important",
    borderBottomLeftRadius: 0,
  };
  useEffect(() => {
    setShow(open);
    window.scrollTo(0, 0);
  }, [open]);

  const handleClose = () => {
    setShow(false);
    close(false);
  };

  return (
    <Drawer
      width="590px"
      styles={drawerStyles}
      closable={closable}
      // style={{
      //   backgroundColor: background,
      //   // minWidth: "590px"
      // }}
      contentWrapperStyle={
        size === "large" ? largeDrawerStyles : contentWrapperStyle
      }
      // destroyOnClose
      // placement={layout === "ltr" ? "right" : "left"}
      placement={placement ? placement : layout === "ltr" ? "right" : "left"}
      title={
        headerTitle && (
          <div className="flex justify-between gap-4 pl-4 dark:text-white">
            {avatar ? (
              <div className="flex items-center gap-2">
                {/* <div className="overflow-hidden border-1 border-white rounded-full shadow-md 2xl:size-10 size-8 shrink-0">
                  <img
                    src={src}
                    alt="dummyImage"
                    className="object-cover object-center w-full h-full"
                  /> */}
                <Avatar
                  // className="object-cover object-center w-full h-full"
                  image={src}
                  name={name} />

                <div className="relative flex flex-col">
                  <h1 className="h1">{header[0]}</h1>
                  <p className="para">{header[1]}</p>
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col">
                <h1 className="h1">{header[0]}</h1>
                <p className="para">{header[1]}</p>
              </div>
            )}

            <div className="">{headerRight}</div>
          </div>
        )
      }
      footer={
        footer && (
          <div className="flex sm:justify-between gap-1 sm:gap-8 items-center py-[10px] dark:bg-dark">
            {footerData.length > 0 ? (
              <div className="flex items-center justify-between w-4/6 m-auto dark:text-white">
                {footerData.map((item, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="text-xs">{item}</div>
                    <div className="text-xs font-bold">Value</div>
                  </div>
                ))}
              </div>
            ) : null}
            {footerBackButton && nextStep === 0 ? (
              <Button
                BtnType="cancel"
                buttonName={footerBackButtonName}
                icon={<IoIosArrowBack />}
                handleSubmit={() => {
                  ClickfooterBackButton();
                }}
              />
            ) : (null)}
            {footerSubmitButton && nextStep !== 0 ? (
              <Button
                BtnType="cancel"
                buttonName={t("Previous")}
                icon={<IoIosArrowBack />}
                handleSubmit={() => {
                  buttonClickCancel();
                }}
              />
            ) : (
              <div className="">
                {nextStep !== 0 ? (
                  <p className="para">{t("Reset_to_default")}</p>
                ) : (
                  ""
                )}
              </div>
            )}
            {customButton ? (
              <div className="flex items-center justify-start gap-1 sm:gap-2">
                {customButton}
              </div>
            ) : (
              <div className="flex items-center justify-start gap-1 sm:gap-2">
                {initialBtn && footerBtn[0] && (
                  <Button
                    handleSubmit={() => close(false)}
                    // updateFun={() => updateFun()}
                    // updateBtn={updateBtn}
                    buttonName={footerBtn[0]}
                    BtnType="cancel"
                    icon={<IoClose />}
                    className="sm:pr-8"
                  />
                )}

                {saveAndContinue
                  ? initialBtn && (
                    <Button
                      handleSubmit={() => {
                        buttonClick();
                      }}
                      buttonName={
                        btnName ? btnName : <div className="flex items-center gap-2 ">
                          <div>{t("Save_And_Continue_button")}</div>
                          <IoIosArrowForward />
                         </div> 
                      }
                      type="submit"
                      className="sm:px-5 sm:py-2 text-xs font-semibold text-white rounded-md lg:text-sm"
                      BtnType="primary"
                    />
                  )
                  : //   {/* {btnName ? btnName : t("Save_And_Continue_button")} */}
                  // {/* </Button> */}
                  footerSubmitButton &&
                  footerBtn[1] && (
                    <Button
                      handleSubmit={() => handleSubmit()}
                      updateFun={() => updateFun()}
                      updateBtn={updateBtn}
                      buttonName={footerBtn[1]}
                      BtnType="primary"
                      className="sm:px-5 sm:py-2 text-xs font-semibold text-white rounded-md lg:text-sm"
                      disabled={footerBtnDisabled}
                    />
                  )}
              </div>
            )}
          </div>
        )
      }
      // style={{
      //   width: "100vw",
      // }}
      // width={830}
      // size="100%"
      onClose={handleClose}
      open={show}
    //   style={{
    //     borderRadius: 12,
    //   }}
    // className={` ${className !== "w-Full" && "md:rounded-xl"} `}
    >
      {/* Display selectedAccordionItem data here */}

      {children}
    </Drawer>
  );
}
