import React from "react";
import Expiry from "../../../../assets/images/Expiry.png";

function ExpiryNotification() {
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold text-orange-700">
      <img
        loading="lazy"
        src={Expiry}
        alt=""
        className="w-6 h-6 rounded-2xl"
      />
      <p>Expiry in 20 days</p>
    </div>
  );
}

export default ExpiryNotification;