import React, { useState, useEffect, useRef } from "react";
import { Command } from "cmdk";
import { Modal } from "antd";
import {
  PiArrowDown,
  PiArrowUDownLeft,
  PiArrowUp,
  PiBuilding,
  PiBuildings,
  PiCheckSquare,
  PiFilePlus,
  PiMagnifyingGlass,
  PiQuestion,
  PiUser,
  PiWatch,
} from "react-icons/pi";
import { RiCommandFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { BsEscape } from "react-icons/bs";

const classNames = {
  body: ["my-modal-body"],
  mask: ["my-modal-mask"],
  header: ["my-modal-header"],
  footer: ["my-modal-footer"],
  content: ["my-modal-content"],
};

const modalStyles = {
  header: {
    background: "transparent",
  },
  body: {},
  mask: {
    background:
      "linear-gradient(180deg, rgba(14, 5, 34, 0.30) 0%, rgba(13, 6, 30, 0.60) 100%);",
  },
  footer: {},
  content: {
    padding: 0,
    borderRadius: "16px",
    overflow: "hidden",
  },
};

const recentSearches = [
  {
    icon: <PiFilePlus />,
    title: "Create new document",
    description: "Create new documents for company, employee...",
    shortcut: "⌘ D",
  },
  {
    icon: <PiWatch />,
    title: "Create new work policy",
    description: "Create work policy and procedures for employees...",
    shortcut: "⌘ W",
  },
];
const otherPages = [
  {
    icon: <PiUser />,
    title: "My profile",
    description: "View and edit your profile details...",
    shortcut: "⌘ K P",
  },
  {
    icon: <PiBuildings />,
    title: "Company profile",
    description: "View company profile and details...",
    shortcut: "⌘ K C",
  },
  {
    icon: <PiCheckSquare />,
    title: "My attendance",
    description: "Regularize your attendance, miss punch etc...",
    shortcut: "⌘ W A",
  },
  {
    icon: <PiQuestion />,
    title: "Support",
    description: "Support",
    shortcut: "?",
  },
];

const commandItems = [...recentSearches, ...otherPages];

const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mode = useSelector((state) => state.layout.mode);
  const commandListRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
          setSelectedIndex((prevIndex) =>
            prevIndex < commandItems.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case "ArrowUp":
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : commandItems.length - 1
          );
          break;
        case "Enter":
          alert(`Selected: ${commandItems[selectedIndex].title}`);
          setOpen(false);
          break;
        case "Escape":
          setOpen(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedIndex]);

  return (
    <Modal
      title={null}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={600}
      closeIcon={null}
      classNames={classNames}
      styles={modalStyles}
    >
      <Command
        className="rounded-lg shadow-lg overflow-hidden"
        style={{
          background: `${
            mode === "dark" &&
            "linear-gradient(231deg, #4F4F4F 0%, #3B3B3B 97.3%)"
          }`,
        }}
      >
        <div className="w-full px-4 py-3 border-b border-black/10 dark:border-white/20 text-xs !font-normal flex items-center text-[#A2A2A2] relative">
          <div className="flex items-center gap-2 w-full">
            <PiMagnifyingGlass size={24} />
            <Command.Input
              ref={inputRef}
              placeholder="Type a command or search..."
              className=" bg-transparent w-full"
            />
          </div>
          <div className="flex items-center gap-1 absolute right-4">
            <div className="bg-[#E0E0E0] dark:bg-[#747474] rounded p-[2px] w-[18px] flex items-center justify-center text-black dark:text-white text-opacity-50 h-[18px]">
              <span className="text-xs 2xl:text-sm">K</span>
            </div>
            <div className="bg-[#E0E0E0] dark:bg-[#747474] rounded p-[2px] w-[18px] flex items-center justify-center text-black dark:text-white text-opacity-50 h-[18px]">
              <RiCommandFill className="text-base 2xl:text-md" />
            </div>
          </div>
        </div>
        <Command.List
          ref={commandListRef}
          className="p-4 !h-[446px] overflow-auto"
        >
          <Command.Empty>No results found.</Command.Empty>

          {/* <div className="text-gray-500 text-sm mb-2"></div> */}
          {/* <Command.Group heading="Recent Searches">
            {recentSearches.map((item, index) => (
              <Command.Item
                key={index}
                className={`flex items-center justify-between px-4 py-2 rounded cursor-pointer dark:hover:bg-[#515151] ${
                  selectedIndex === index ? "bg-gray-100 dark:bg-[#515151]" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="rounded-[9px] vhcenter size-10 text-xl bg-white dark:bg-transparent borderb shrink-0 mr-3">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-base font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">{item.shortcut}</div>
              </Command.Item>
            ))}
          </Command.Group> */}
          {/* <Command.Separator className="bg-black/10 dark:bg-white/20" /> */}
          {/* <div className="text-gray-500 text-sm mb-2"></div> */}
          <Command.Group heading="Other Pages">
            {otherPages.map((item, index) => (
              <Command.Item
                key={recentSearches.length + index}
                className={`flex items-center justify-between px-4 py-2 rounded cursor-pointer dark:hover:bg-[#515151] ${
                  selectedIndex === recentSearches.length + index
                    ? "bg-gray-100 dark:bg-[#515151]"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="rounded-[9px] vhcenter size-10 text-xl bg-white dark:bg-transparent borderb shrink-0 mr-3">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-base font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">{item.shortcut}</div>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="w-full px-4 py-3 border-t border-black/10 dark:border-white/20 text-xs !font-normal flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-[5px] vhcenter borderb">
              <PiArrowUp size={16} />
            </div>
            <div className="size-7 rounded-[5px] vhcenter borderb">
              <PiArrowDown size={16} />
            </div>
            <p className="text-sm font-medium">navigate</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-[5px] vhcenter borderb">
              <PiArrowUDownLeft size={16} />
            </div>
            <p className="text-sm font-medium">open</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-[5px] vhcenter borderb">
              <BsEscape size={16} />
            </div>
            <p className="text-sm font-medium">close</p>
          </div>
        </div>
      </Command>
    </Modal>
  );
};

export default SearchCommand;
