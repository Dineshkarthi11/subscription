import React from "react";
import logo from "../../assets/images/logo.png";

export default function Loader() {
  return (
    <div className="h-screen absolute inset-0 bg-white dark:bg-black vhcenter">
      <div class="spinner"></div>
    </div>
  );
}
