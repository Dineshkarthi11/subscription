import React from "react";
import HeaderActive from "./HeaderActive"; // If you plan to use this, make sure it's implemented
import UserSearch from "./UserSearch";
import UserList from "./UserList";
import ActionButtons from "./ActionButtons"; // If needed, otherwise remove this import
import buttonclosing from '../../../../assets/images/buttonclosing.png';
import DrawerPop from "../../../common/DrawerPop"; // Import DrawerPop for consistent popup behavior

function ActiveInactiveUsers({ closePopup, show }) {
  return (
    <DrawerPop
      open={show}
      close={closePopup}
      initialBtn={false}
      footerSubmitButton={false}
      footer={false}
      contentWrapperStyle={{
        width: "550px", // Adjusted width for the card style
      }}
      bodyPadding="0"
      header={["Active and Inactive Users", "View and manage the status of all active and inactive users"]}
    >
      <div className="flex flex-col">

        {/* Main Content */}
        <main className="flex flex-col px-6 pt-4 pb-8 w-full bg-white/70 rounded-lg mt-4">
          <UserSearch />
          <UserList />
        </main>
      </div>
    </DrawerPop>
  );
}

export default ActiveInactiveUsers;
