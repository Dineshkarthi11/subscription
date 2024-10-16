import React from "react";

// ===================================================================================================
// TO Re-USE THIS COMPONENT

// const ParentComponent = () => {
//     const [activeStatus, setActiveStatus] = useState('Approved');

//     const statuses = [
//       { label: 'All', count: 19 },
//       { label: 'Approved', count: 12 },
//       { label: 'Pending', count: 5 },
//       { label: 'Rejected', count: 2 },
//     ];

//     return (
//       <StatusFilter
//         statuses={statuses}
//         activeStatus={activeStatus}
//         onStatusChange={setActiveStatus}
//       />
//     );
//   };

// ===================================================================================================

const StatusItem = ({ label, count, isActive, onClick }) => (
  <div
    className={`px-2.5 py-2 h-full vhcenter gap-2 ${
      isActive ? "" : "cursor-pointer"
    }`}
    onClick={onClick}
  >
    <p
      className={`text-[10px] 2xl:text-xs ${
        isActive
          ? "font-semibold text-primary"
          : "font-medium hover:text-primaryalpha dark:text-white"
      }`}
    >
      {label}
    </p>
    <p
      className={`size-4 vhcenter 2xl:size-6 text-[8px] 2xl:text-[11px] font-semibold rounded-full ${
        isActive
          ? "bg-primaryalpha/10 border-primaryalpha/30 border text-primaryalpha"
          : "bg-white borderb text-grey dark:text-primary"
      }`}
    >
      {count}
    </p>
  </div>
);

const StatusFilter = ({ statuses, activeStatus, onStatusChange }) => {
  return (
    <div className="flex items-center gap-2 h-[31px] 2xl:h-[42px] bg-[#F8FAFC] p-1 rounded-lg dark:bg-dark">
      {/* {console.log(activeStatus, "status")} */}
      {/* {console.log(statuses, "status")} */}
      {statuses.map((status) => (
        <>
          <StatusItem
            key={status.label}
            label={status.label}
            count={status.count}
            isActive={activeStatus === status.label}
            onClick={() => onStatusChange(status.label)}
          />
          
        </>
      ))}
    </div>
  );
};

export default StatusFilter;

{/* <div className="flex items-center gap-2 h-[31px] 2xl:h-[42px] bg-[#F8FAFC] p-1 rounded-lg dark:bg-dark">
  <div className="px-2.5 py-2 h-full vhcenter gap-2 cursor-pointer">
    <p className="text-[10px] 2xl:text-xs font-medium hover:text-primaryalpha">
      All
    </p>
    <p className=" size-4 vhcenter 2xl:size-6 bg-white borderb text-grey text-[8px] 2xl:text-[11px] font-semibold rounded-full">
      19
    </p>
  </div>
  <div className="px-2.5 py-2 h-full vhcenter gap-2">
    <p className="text-[10px] 2xl:text-xs font-semibold text-primary">
      Approved
    </p>
    <p className=" size-4 vhcenter 2xl:size-6 bg-primaryalpha/10 border-primaryalpha/30 border text-primaryalpha text-[8px] 2xl:text-[11px] font-semibold rounded-full">
      12
    </p>
  </div>
  <div className="px-2.5 py-2 h-full vhcenter gap-2 cursor-pointer">
    <p className="text-[10px] 2xl:text-xs font-medium hover:text-primaryalpha">
      Pending
    </p>
    <p className=" size-4 vhcenter 2xl:size-6 bg-white borderb text-grey text-[8px] 2xl:text-[11px] font-semibold rounded-full">
      5
    </p>
  </div>
  <div className="px-2.5 py-2 h-full vhcenter gap-2 cursor-pointer">
    <p className="text-[10px] 2xl:text-xs font-medium hover:text-primaryalpha">
      Rejected
    </p>
    <p className=" size-4 vhcenter 2xl:size-6 bg-white borderb text-grey text-[8px] 2xl:text-[11px] font-semibold rounded-full">
      2
    </p>
  </div>
</div>; */}
