import React from "react";
import Button from "../common/Button";

function DownloadButton({
  buttonName = "Button Name",
  handlingFunction = () => {},
  loading,
  // error,
  icon
}) {
  return (
    <div>
      <Button handleSubmit={handlingFunction}
      buttonName={buttonName}
      icon={icon}>
        {loading ? "Downloading please wait..." : buttonName}
        
      </Button>
      {/* {error && <p className="absolute text-red-600 text-[10px] 2xl:text-xs pt-1">{error}</p>} */}
    </div>
  );
}

export default DownloadButton;
