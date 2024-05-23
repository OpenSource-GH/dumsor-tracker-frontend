import { ColorModeToggle } from "@/components/ui/color-mode-toggle";
import React from "react";

function SettingsPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-3">
      <div>
        <h2>Settings</h2>
      </div>
      <br />
      <div className="w-full">
        <div className="flex justify-between items-center border-b py-5">
            <p>Color Theme</p>
            <ColorModeToggle/>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
