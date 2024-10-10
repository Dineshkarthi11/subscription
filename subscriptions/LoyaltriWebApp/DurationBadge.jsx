import React from "react";
import Expiry from "../../../../assets/images/Expiry.png";

function DurationBadge() {
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold text-violet-600">
      <img
        loading="lazy"
        src={Expiry}
        alt=""
        className="w-6 h-6 rounded-2xl"
      />
      <p>1 year duration</p>
    </div>
  );
}

export default DurationBadge;