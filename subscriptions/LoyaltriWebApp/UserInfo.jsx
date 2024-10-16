import React from "react";

function UserInfo() {
  return (
    <div className="text-sm font-medium text-white">

      {/* User Info */}
      <div className="mt-12">
        <p className="text-zinc-100">Users</p>
        <p className="mt-2 text-base font-extrabold">
          <span className="text-600">25/</span>
          <span className="text-sm">50</span> active users
        </p>
        <hr className="border-t border-zinc-300" />
      </div>
    </div>
  );
}

export default UserInfo;