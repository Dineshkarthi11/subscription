import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { FaAsterisk } from "react-icons/fa6";
import config from "../../config";
import Avatar from "./Avatar";
import upload from "../../assets/images/upload.jpg";
const { Dragger } = Upload;

export default function FileUpload({
  change = () => {},
  className,
  flex = true,
  title = "",
  required = false,
  fileName = "",
  showUploadList = true,
  maxWidth, // default value
  maxHeight, // default value
  error = "",
  defaultname,
  defaulturl,
}) {
  const { t } = useTranslation();
  const allowedFileFormats = [
    "jpg",
    "png",
    "jpeg",
    "svg",
    "webp",
    "pdf",
    "doc",
    "docx",
    "pptx",
    "wpd",
    "rtf",
    "xlsx",
    "xls",
  ];
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (defaultname && defaulturl) {
      const defaultFiles = [
        {
          uid: "-1",
          name: defaultname,
          status: "done",
          url: defaulturl,
        },
      ];
      setFileList(defaultFiles || []); // Ensure it's an array
    }
  }, [defaultname, defaulturl]);
  const fileFormatsString = allowedFileFormats.join(", ");
  let token = JSON.parse(localStorage.getItem("LoginData"));
  const validateImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width > maxWidth || img.height > maxHeight) {
            message.error(
              `${file.name} image dimensions exceed ${maxWidth}x${maxHeight}px.`
            );
            reject(false);
          } else {
            resolve(true);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const props = {
    name: "file",
    multiple: true,
    action: `${config.payRollUrl}/api/fileHandler`,
    // action: "https://demo-payroll-api.loyaltri.com/api/fileHandler",
    // action: "https://web-payroll-api.loyaltri.com/api/fileHandler",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token?.userData.token}`,
    },
    beforeUpload: async (file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isAllowedFile = allowedFileFormats.includes(fileExtension);

      if (!isAllowedFile) {
        message.error(`${file.name} file format is not supported.`);
        return Upload.LIST_IGNORE;
      }

      if (["jpg", "jpeg", "png", "svg", "webp"].includes(fileExtension)) {
        // Apply image dimension validation only for image files
        try {
          await validateImageDimensions(file);
          return true; // Accept the file if it's an image and dimensions are valid
        } catch {
          return Upload.LIST_IGNORE; // Prevent upload if dimensions are not valid
        }
      }

      // For non-image files, no dimension validation needed
      return true;
    },
  };

  const handleRemove = () => {
    change(null);
  };
  console.log(fileList, "is fileList an array?");

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-1 ">
        {title && (
          <label
            htmlFor=""
            className="text-xs font-medium 2xl:text-sm dark:text-white"
          >
            {title}
          </label>
        )}
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div>
      <Dragger
        maxCount={1}
        fileList={fileList}
        // previewFile={}
        {...props}
        onChange={(info) => {
          const newFileList = info.fileList || [];
          setFileList(newFileList); // Ensure it's always an array
          const { status, originFileObj } = info.file;
          if (status !== "uploading") {
            console.log(newFileList);
          }
          change(originFileObj);
          console.log("ddddddddddddddddddddddddddd", info.file);
        }}
        // onChange={(info) => {
        //   const { status, originFileObj } = info.file;
        //   if (status !== "uploading") {
        //     // console.log(info.fileList);
        //     // console.log(originFileObj);
        //   }
        //   // if (status === "done") {
        //   //   message.success(`${info.file.name} file uploaded successfully.`);
        //   // } else if (status === "error") {
        //   //   message.error(`${info.file.name} file upload failed.`);
        //   // }
        //   // else if (status === "removed") {
        //   //   message.success(`${info.file.name} file removed.`);
        //   // }
        //   change(originFileObj);
        // }}
        onDrop={(e) => {
          // console.log(e.dataTransfer.files[0]);
          console.log("ddddddddddddddddddddddddddd", e.dataTransfer.files[0]);

          change(e.dataTransfer.files[0]);
        }}
        showUploadList={showUploadList}
      >
        {flex === true ? (
          <div className="flex items-center gap-3">
            <div>
              <Avatar
                image={upload}
                className="size-10 2xl:size-12 shrink-0 border-1 border-white shadow"
              />
            </div>
            <div className="flex flex-col items-baseline">
              <h2 className="acco-subhead ml-2"> {t("Click_to_upload")}</h2>
              <p className="text-grey text-xs lg:text-[10px] 2xl:text-xs text-start">
                {t("Allowed formats")}: {fileFormatsString}
              </p>
            </div>
          </div>
        ) : (
          <div className="">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </div>
        )}
      </Dragger>

      {error && (
        <div className="flex items-center pt-1 text-red-600 text-[10px]">
          <span>{error}</span>
        </div>
      )}

      {fileName && (
        <div className="flex items-center gap-2 mt-2">
          <p className="text-sm font-medium">{fileName}</p>
          <AiOutlineDelete
            className="text-red-500 cursor-pointer"
            onClick={handleRemove}
          />
        </div>
      )}
    </div>
  );
}
