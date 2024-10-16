import React from "react";

function UserItem({ name, id, image, isNew }) {
  return (
    <li className="flex justify-between items-center w-full mt-2">
      <div className="flex gap-3 items-center">
        <img
          loading="lazy"
          src={image}
          alt={`${name}'s profile`}
          className="object-contain w-11 aspect-square rounded-full shadow-md"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-base font-medium text-black">{name}</span>
            {isNew && (
              <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold text-white bg-violet-600 rounded">
                New
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">{id}</div>
        </div>
      </div>
    </li>
  );
}

export default UserItem;