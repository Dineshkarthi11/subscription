import React from "react";
import HeaderActive from "./HeaderActive";
import UserSearch from "./UserSearch";
import UserList from "./UserList";
import ActionButtons from "./ActionButtons";
import buttonclosing from '../../../../assets/images/buttonclosing.png';

function ActiveInactiveUsers({ closePopup }) {
  return (
    <section className="fixed inset-0 flex justify-end items-center bg-black/10 my-8 h-screen pointer-events-none">
      {/* Main container for header and card */}
      <div className="w-[550px] flex flex-col items-end mr-6 bg-white/50 pointer-events-auto"> 
        {/* Close button */}
        <button onClick={closePopup} className="absolute top-4 right-4">
          <img
              src={buttonclosing}
            alt="Close"
            className="w-[30px] object-contain"
          />
        </button>

        {/* Header */}
        <div className="flex flex-wrap gap-2 items-center w-full">
  <div 
    className="flex items-center ml-5 mt-5 p-2  rounded-3xl bg-zinc-100 h-[43px] w-[43px] cursor-pointer"
    onClick={closePopup} // Add the onClick handler here
  >
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/361c6498671a08dbbd07d2e419c1ef5cbe302666fadc6e4575adad92c9bfc33c?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39"
      alt="Close"
      className="object-contain w-[30px]"
    />
  </div>
  <div className="flex flex-1 mt-4 flex-col">
    <h1 className="text-xl font-semibold text-black">
      Active and Inactive Users
    </h1>
    <p className="mt-1 text-base text-gray-500">
      View and manage the status of all active and inactive users
    </p>
  </div>
</div>


        {/* Divider under header */}
        <div className="w-full z-10 shrink-0 mt-4 rounded-3xl bg-zinc-300 h-[5px] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]" />

        {/* Main card */}
        <main className="flex flex-col px-6 pt-4 pb-8 w-full bg-white/70 shadow-[0px_24px_100px_rgba(0,0,0,0.15)] rounded-lg mt-4">
          <UserSearch />
          <UserList />
        </main>
      </div>
    </section>
  );
}

export default ActiveInactiveUsers;






// import React from "react";
// import HeaderActive from "./HeaderActive";
// import UserSearch from "./UserSearch";
// import UserList from "./UserList";

// function ActiveInactiveUsers({ closePopup }) {
//   return (
//     <section className="fixed inset-0 flex justify-center items-center h-screen bg-black bg-opacity-50 pointer-events-auto">
//       {/* Main container for header and card */}
//       <div className="w-[550px] flex flex-col bg-white rounded-lg shadow-lg pointer-events-auto"> 
//         {/* Close button */}
//         <button onClick={closePopup} className="absolute top-2 right-2">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/361c6498671a08dbbd07d2e419c1ef5cbe302666fadc6e4575adad92c9bfc33c"
//             alt="Close"
//             className="w-[30px] object-contain"
//           />
//         </button>

//         {/* Header */}
//         <div className="w-full">
//           <HeaderActive />
//         </div>

//         {/* Divider under header */}
//         <div className="w-full h-[5px] bg-zinc-300" />

//         {/* Main card */}
//         <main className="flex flex-col px-4 pt-2 pb-4 w-full bg-white shadow-md rounded-b-lg">
//           <UserSearch />
//           <UserList />
//         </main>
//       </div>
//     </section>
//   );
// }

// export default ActiveInactiveUsers;

