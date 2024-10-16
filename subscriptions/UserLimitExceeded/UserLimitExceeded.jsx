import React from "react";
import UserLimitMessage from "./UserLimitMessage";
import UserCountInput from "./UserCountInput";
import SendRequestButton from "./SendRequestButton";
import SupportMessage from "./SupportMessage";

function UserLimitExceeded() {
  return (
    <div className="relative w-full flex items-center justify-center backdrop-blur-md">
      {/* Card container */}
      <main className="relative z-10 flex flex-col justify-center py-1.5 max-w-[95%] sm:max-w-[437px]">
        <section className="flex overflow-hidden relative flex-col items-center py-5 w-full rounded-2xl max-w-full sm:max-w-[437px]">
          <UserLimitMessage />
          <div className="flex absolute bottom-0 z-0 self-start w-0 border-solid border-[5px] border-zinc-300 border-opacity-60 h-[361px] min-h-[303px] right-[-113px] sm:right-[-113px]" />
          <form className="flex z-0 flex-col mt-4 max-w-full w-full sm:w-[405px]">
            <UserCountInput />
            <SendRequestButton />
            <SupportMessage />
          </form>
        </section>
      </main>
    </div>
  );
}

export default UserLimitExceeded;
