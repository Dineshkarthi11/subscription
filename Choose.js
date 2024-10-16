import React, { useEffect, useState } from "react";

export default function Choose({ selectedCount, children }) {
  const [width, setWidth] = useState("100%"); // Default fallback

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const isFirefox =
        navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      const isWebkit = navigator.userAgent.toLowerCase().indexOf("webkit") > -1;

      if (isFirefox) {
        setWidth("-moz-available");
      } else if (isWebkit) {
        setWidth("-webkit-fill-available");
      } else {
        setWidth("100%");
      }
    }
  }, []);

  return (
    <div className="absolute left-0 right-0 h-fit md:h-20">
      <div
        className="fixed bottom-0 flex items-center p-4 md:h-20 bg-white/60 border-t border-black/10 z-50 overflow-hidden backdrop-blur-[24px] shadow-footerdiv dark:bg-black px-4"
        style={{ width }}
      >
        <div className="flex flex-col items-center justify-between w-full h-full gap-4 md:flex-row">
          <p className="flex items-center gap-8">
            <span className="text-sm font-semibold 2xl:text-base text-primary">
              {selectedCount > 1
                ? `${selectedCount} Requests Selected`
                : `${selectedCount} Request Selected`}
            </span>
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
