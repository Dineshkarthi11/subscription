import React, { useState } from "react";
import { Switch } from "antd";

// try to list

const ToggleNew = () => {
  const [switches, setSwitches] = useState([
    { id: 1, label: "Switch 1", value: false },
    { id: 2, label: "Switch 2", value: true },
    { id: 3, label: "Switch 3", value: false },
  ]);

  const handleToggle = (id, checked) => {
    setSwitches((prevSwitches) =>
      prevSwitches.map((sw) => (sw.id === id ? { ...sw, value: checked } : sw))
    );
  };

  return (
    <div>
      {switches.map((sw) => (
        <div key={sw.id} style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>{sw.label}</span>
          <Switch
            checked={sw.value}
            onChange={(checked) => handleToggle(sw.id, checked)}
            className=" border"
          />
        </div>
      ))}
    </div>
  );
};
