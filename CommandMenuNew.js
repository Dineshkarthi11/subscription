import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import Avatar from "./Avatar";
import { IoIosArrowForward } from "react-icons/io";
import * as Popover from "@radix-ui/react-popover";
import { useTheme } from "@emotion/react";

const CommandMenuNew = ({ items, loading }) => {
  const [popUp, setPopUp] = useState(false);
  const commandListRef = useRef(null);
  const navigate = useNavigate();

  const { resolvedTheme: theme } = useTheme();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        commandListRef.current &&
        !commandListRef.current.contains(event.target)
      ) {
        setPopUp(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commandListRef]);

  return (
    <div className="raycast">
      <Command value={popUp} onValueChange={(v) => setPopUp(v)}>
        <div cmdk-raycast-top-shine="" />
        <Command.Input
          ref={inputRef}
          autoFocus
          placeholder="Search for apps and commands..."
        />
        <hr cmdk-raycast-loader="" />
        <Command.List ref={listRef}>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            {items?.map((item) => {
              const employeeName = item.firstName + " " + item.lastName;
              return (
                <Command.Item
                  key={`word-${item.employeeId}`}
                  value={employeeName}
                  className="hover:bg-slate-50 dark:hover:text-black flex justify-between items-center gap-2 p-2 rounded-lg cursor-pointer"
                  onClick={() => {
                    navigate(`/employeeProfile/${item.employeeId}`);
                    // window.location.reload();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar image={item.profilePicture} name={employeeName} />
                    <span className="flex flex-col gap-1">
                      <p className="text-xs font-semibold">{employeeName}</p>
                      <p className="text-[8px]">Emp Code: {item.code}</p>
                    </span>
                  </div>
                  <IoIosArrowForward className="text-primary" />
                </Command.Item>
              );
            })}
          </Command.Group>
          <Command.Group heading="Commands">
            <Command.Item
              value="Clipboard History"
              keywords={["copy", "paste", "clipboard"]}
            >
              Clipboard History
            </Command.Item>
            <Command.Item
              value="Import Extension"
              keywords={["import", "extension"]}
            >
              Import Extension
            </Command.Item>
            <Command.Item
              value="Manage Extensions"
              keywords={["manage", "extension"]}
            >
              Manage Extensions
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div cmdk-raycast-footer="">
          <button cmdk-raycast-open-trigger="">
            Open Application
            <kbd>↵</kbd>
          </button>
          <hr />
        </div>
      </Command>
    </div>
  );
};

export default CommandMenuNew;
