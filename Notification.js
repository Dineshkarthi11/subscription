import React from "react";
import { notification } from "antd";
import { twMerge } from "tailwind-merge";
import { PiCheckCircleFill, PiWarningFill } from "react-icons/pi";

// ===========================================
// TO USE THIS NOTIFICATION
// import { useNotification } from "../../Context/Notifications/Notification";

// const { showNotification } = useNotification();

// const handleClick = () => {
//   showNotification({
//     placement: 'top', // default 'top'
//     message: 'Your Message!',
//     description: 'Your Description', // Already have default description
//     style: { width: 400 }, // optional
//     type: 'error', // default 'success' |  'error'
//   });
// };

// <Button type="primary" onClick={handleClick}>Show</Button>
// ============================================

const Notification = ({
  placement = "top",
  message,
  description,
  style = {},
  className = "",
  type = "success",
  callback
}) => {
  const [api, contextHolder] = notification.useNotification();
  const mode = localStorage.getItem("theme");

  React.useEffect(() => {
    if (message) {
      api.open({
        message: message,
        description:
          description ||
          (type === "success"
            ? "Your update has been successfully saved, and all changes are now reflected on the page."
            : "Unable to process the update at this time. Please try again later"),
        placement: placement,
        icon:
          type === "success" ? (
            <div className="size-10 vhcenter rounded-full overflow-hidden bg-[#F1FCF8] border-[1.5px] border-white drop-shadow-[0px_4.868px_11.358px_rgba(62,_255,_93,_0.20)]">
              <PiCheckCircleFill size={22} className="text-[#52CB98]" />
            </div>
          ) : (
            <div className="size-11 vhcenter rounded-full overflow-hidden bg-[#FDF6F6] border-[1.5px] border-white drop-shadow-[0px_4.868px_11.358px_rgba(255,_62,_62,_0.20)]">
              <PiWarningFill size={22} className="text-[#f22020]" />
            </div>
          ),
        style: style,
        className: twMerge(
          `borderb rounded-2xl h-[105px] p-4 ${
            type === "success"
              ? `!border-[#BED9C2] ${
                  mode === "dark"
                    ? "bg-dark"
                    : "bg-notification-success shadow-[0px_4px_10px_0px_#FFF_inset] drop-shadow-[0px_22px_60px_rgba(86,_146,_110,_0.20)]"
                }`
              : `!border-[#DFC3C3]  ${
                  mode === "dark"
                    ? "bg-dark"
                    : "bg-notification-error shadow-[0px_4px_10px_0px_#FFF_inset] drop-shadow-[0px_22px_60px_rgba(134,_92,_144,_0.20)]`"
                }`
          }`,
          className,
          onclose=callback
        ),
      });
    }
  }, [message, description, placement, style, className, api, onclose]);

  return contextHolder;
};

export default Notification;
