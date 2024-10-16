import React from "react";
import { Segmented } from "antd";
import { useMediaQuery } from "react-responsive";

const SegmentedTab = ({
  options,
  selectedOption,
  onChange,
  className,
}) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const handleSegmentChange = (value) => {
    if (onChange && typeof onChange === "function") {
      onChange(value);
    }
  };

  // If selectedOption is not provided, set it to the value of the first option
  const defaultSelectedOption = "";

  // const defaultSelectedOption =
  //   selectedOption || (options[0] && options[0].label) || "";

  return (
    <Segmented
      className={`${className} dark:bg-dark3`}
      size={isSmallScreen ? "small" : "default"}
      options={options.map(({ label, count }) => ({
        label: (
          <div className={`flex items-center justify-center gap-2`}>
            <p className="text-[10px] 2xl:text-sm">{label}</p>
            {count !== "" && (
              <p
                className={`text-[8px] 2xl:text-[10px] rounded size-3.5 2xl:size-4 vhcenter overflow-hidden ${
                  defaultSelectedOption === label
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {count}
              </p>
            )}
          </div>
        ),
        value: label,
      }))}
      value={defaultSelectedOption}
      onChange={handleSegmentChange}
    />
  );
};

export default SegmentedTab;

// FOR REUSE THIS COMPONENT

// const [selectedOption, setSelectedOption] = useState('');

// const handleSegmentChange = (value) => {
//   setSelectedOption(value);
// };
// const optionsWithCount = [
//   { label: 'Daily', count: 10 },
//   { label: 'Weekly', count: 20 },
//   { label: 'Monthly', count: 30 },
//   { label: 'Quarterly', count: 15 },
//   { label: 'Yearly', count: 5 },
// ];
