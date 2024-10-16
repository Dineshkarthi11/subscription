import { useState, useEffect, useMemo } from "react";

const useCurrentDateTime = () => {
  const [dateTime, setDateTime] = useState({
    currentDate: "",
    currentTime: "",
  });

  useEffect(() => {
    const intervalId = setInterval(updateCurrentDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const updateCurrentDateTime = () => {
    const now = new Date();

    const indianTimeOptions = {
      timeZone: userTimeZone,
      // timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formattedTime = now.toLocaleTimeString("en-US", indianTimeOptions);

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    setDateTime({ currentDate: formattedDate, currentTime: formattedTime });
  };

  // Memoize the dateTime object to prevent unnecessary re-renders
  const memoizedDateTime = useMemo(() => dateTime, [dateTime]);

  return memoizedDateTime;
};

export default useCurrentDateTime;
