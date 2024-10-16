import React, { useRef, useEffect } from "react";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { mode } from "d3";
import { useSelector } from "react-redux";

const EmojiPicker = ({
  onEmojiSelect,
  show,
  onClose,
  position = { top: "50px", right: "0px" },
  theme = "light",
}) => {
const mode = useSelector((state) => state.layout.mode);
  const emojiPickerRef = useRef(null);

  // Close the emoji picker if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!show) return null;

  return (
    // <div
    //   ref={emojiPickerRef}
    //   style={{
    //     position: "absolute",
    //     zIndex: 1000,
    //     ...position, // Spread the position object to allow custom positioning
    //   }}
    // >
    //   <Picker onEmojiSelect={onEmojiSelect} theme={theme} />
    // </div>
    <div
      ref={emojiPickerRef}
      style={{
        position: "absolute",
        zIndex: 1000,
        ...position,
      }}
    >
      <Picker
        data={emojiData}
        // set="google"
        theme={mode}
        onEmojiSelect={onEmojiSelect}
        // onEmojiSelect={(e) => {
        //   addFeedsForm.setFieldValue(
        //     "caption",
        //     addFeedsForm.values.caption + e.native
        //   );
        //   setShowEmojiPicker(false);
        // }}
      />
    </div>
  );
};

export default EmojiPicker;
