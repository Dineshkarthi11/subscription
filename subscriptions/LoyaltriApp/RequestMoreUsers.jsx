import React from "react";
import { useNavigate } from "react-router-dom";
import Requestmore from "../../../../assets/images/Requestmore.png";

function RequestMoreUsers({onsubmit= ()=>{}}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/request-additional-user");
  };

  return (
    <button
      className="flex items-center gap-2 text-sm font-medium text-gray-500"
      aria-label="Request More Users"
      onClick={onsubmit}
    >
      <div className="w-6 h-6 bg-neutral-300 rounded-2xl flex items-center justify-center">
        <img
          loading="lazy"
          src={Requestmore}
          alt=""
          className="w-4"
        />
      </div>
      <span>Request More Users</span>
    </button>
  );
}

export default RequestMoreUsers;