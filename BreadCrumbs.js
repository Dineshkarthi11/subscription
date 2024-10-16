import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

// Sample Array
// const breadcrumbItems = [
//   { label: "Home", url: "/" },
//   { label: "Settings",  url: "/Settings" }
//   { label: "Company" }
// ];

const Breadcrumbs = ({ items, description, className }) => {
  useEffect(() => {}, []);

  return (
    <nav className={`${className} text-[10px] 2xl:text-sm font-medium`}>
      <ol className="inline-flex p-0 text-lg list-none">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <IoIosArrowForward className="mx-1 text-xs text-black text-opacity-50 2xl:text-lg dark:text-white" />
            )}
            {index === items.length - 1 ? (
              <span className="text-xs font-semibold text-black dark:text-white 2xl:text-lg">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.url}
                className="text-xs text-black text-opacity-50 dark:text-white hover:text-gray-700 2xl:text-lg"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {description && <p className="para font-medium">{description}</p>}
    </nav>
  );
};

export default Breadcrumbs;
