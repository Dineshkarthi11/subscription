import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaAsterisk } from "react-icons/fa";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const { Dragger } = Upload;

export default function ImageUpload({
  change = () => {},
  className,
  flex = true,
  custom = false,
  children,
  preview = () => {},
  showUploadList = true,
  multiple,
  fileType = "",
  src,
  required = false,
  error = "",
  label = "",
}) {
  const { t } = useTranslation();
  const allowedImageFormats = ["jpg", "png", "jpeg", "svg", "webp"];
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [cropper, setCropper] = useState();

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    preview(src);
    setImageSrc(src);
  };

  const handleChange = (info) => {
    const { status, originFileObj } = info.file;
    onPreview(info.file);
    if (status === "uploading") {
      setFile(originFileObj);
    } else if (status === "removed") {
      setFile(null);
      change(null);
    }
  };

  const getCroppedImg = async (cropperInstance) => {
    if (!cropperInstance) {
      return;
    }

    const croppedCanvas = cropperInstance.getCroppedCanvas();
    return new Promise((resolve, reject) => {
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          blob.name = "croppedImage.png";
          resolve(blob);
        } else {
          reject(new Error("Crop failed"));
        }
      }, "image/png");
    });
  };

  const handleCrop = async () => {
    if (cropper) {
      const croppedImageBlob = await getCroppedImg(cropper);
      change(croppedImageBlob);
      setFile(croppedImageBlob);
      setImageSrc(null);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-xs font-medium 2xl:text-sm">{label}</span>
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div>
      <Dragger
        maxCount={1}
        onChange={handleChange}
        onDrop={(e) => {
          change(e.dataTransfer.files[0]);
        }}
      >
        {custom ? (
          children
        ) : flex ? (
          <div className="flex items-center gap-2">
            {fileType === "image" ? (
              <div className="size-12 2xl:size-14 border-white border-2 rounded-full overflow-hidden">
                <img
                  src={src || (file && URL.createObjectURL(file))}
                  alt=""
                  className="object-cover object-center w-full h-full"
                />
              </div>
            ) : (
              <AiOutlineCloudUpload className="text-3xl text-primary " />
            )}

            <div className="flex flex-col items-baseline">
              <h2 className="pblack font-semibold">{t("Click_to_upload")}</h2>
              <p className="para !font-normal">{t("Format")}</p>
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

      {imageSrc && (
        <Modal
          open={true}
          onCancel={() => setImageSrc(null)}
          onOk={handleCrop}
          okText="Crop"
          cancelText="Cancel"
        >
          <Cropper
            src={imageSrc}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            guides={false}
            cropBoxResizable={false}
            cropBoxMovable={false}
            crop={(e) => {}}
            onInitialized={(instance) => setCropper(instance)}
          />
        </Modal>
      )}

      {error && (
        <div className="flex items-center pt-2 text-red-600 text-[10px]">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
