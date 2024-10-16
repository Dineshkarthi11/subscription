import React from "react";

function ActionButtons() {
  return (
    <div className="flex z-10 flex-wrap gap-4 justify-between items-center mt-0 w-full text-sm font-semibold">
      <button className="text-black">Reset to default</button>
      <div className="flex gap-2 justify-center items-center">
        <button className="px-5 py-3 text-black rounded-lg border border-solid shadow-sm border-black border-opacity-40">
          Cancel
        </button>
        <button className="px-5 py-3 text-white bg-violet-600 rounded-lg border border-violet-600 shadow-sm">
          Save
        </button>
      </div>
    </div>
  );
}

export default ActionButtons;