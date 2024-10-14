import React from "react";
import Header from "./HeaderLimit";
import UserLimitMessage from "./UserLimitMessage";
import UserCountInput from "./UserCountInput";
import SendRequestButton from "./SendRequestButton";
import SupportMessage from "./SupportMessage";

function UserLimitExceeded() {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center backdrop-blur-md bg-white/30">
      {/* Full-page background with blur */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/30 z-0"></div>

      {/* Card container */}
      <main className="relative z-10 flex flex-col justify-center py-1.5 bg-white rounded-3xl border border-solid border-zinc-100 max-w-[447px] shadow-[0px_31px_60px_rgba(59,55,75,0.1)]">
        <section className="flex overflow-hidden relative flex-col items-center py-5 w-full rounded-2xl max-w-[437px] shadow-[0px_10px_15px_rgba(182,181,254,0.19)]">
          <UserLimitMessage />
          <div className="flex absolute bottom-0 z-0 self-start w-0 border-solid border-[5px] border-zinc-300 border-opacity-60 h-[361px] min-h-[303px] right-[-113px]" />
          <UserCountInput />
          <SendRequestButton />
          <SupportMessage />
          <Header />
        </section>
      </main>
    </div>
  );
}

export default UserLimitExceeded;
