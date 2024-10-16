import React from "react";
import UserInfo from "./UserInfo";
import DurationBadge from "./DurationBadge";
import RequestMoreUsers from "./RequestMoreUsers";
import UserInfoDetails from "./UserInfoDetails";
import Firstcard from "../../../../assets/images/Firstcard.png"

function LoyaltriWebApp() {
  return (
    <article className="relative flex flex-col w-[445px] h-[150px] min-w-[320px] min-h-[250px] rounded-2xl overflow-hidden shadow-xl shadow-violet-400">
      {/* Background Image */}
      <img
        loading="lazy"
        src={Firstcard}
        alt="Shape"
        className="absolute inset-0 h-[350px] w-full object-cover rounded-2xl z-0"
      />

      {/* Top-left: User Info */}
      <div className="absolute top-4 left-5 z-10">
        <UserInfoDetails />
      </div>

      {/* Top-right: Duration Badge */}
      <div className="absolute top-4 right-10 z-10">
        <DurationBadge />
      </div>

      {/* Bottom-left: User Count */}
      <div className="absolute bottom-5 left-5 z-10">
        <UserInfo />
      </div>

      {/* Bottom-right: Request More Users */}
      <div className="absolute bottom-4 right-5 z-10">
        <RequestMoreUsers />
      </div>
    </article>
  );
}

export default LoyaltriWebApp;
