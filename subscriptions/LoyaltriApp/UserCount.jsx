import React from "react";

function UserCount({ onsubmit = () => {} }) {
  return (
    <div>
      <p className="text-gray-500">Users</p>
      <p
        className="text-base font-extrabold cursor-pointer mt-1"
        onClick={onsubmit} // Trigger onsubmit on click
      >
        <span className="text-violet-600">25/</span>
        <span className="text-sm text-violet-600">50</span>{" "}
        <span className="text-sm text-violet-600">active users</span>
      </p>
    </div>
  );
}

export default UserCount;
