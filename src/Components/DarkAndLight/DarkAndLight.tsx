import {useState} from "react";
import DarkModeToggle from "react-dark-mode-toggle";

export default () => {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
  
    <DarkModeToggle className="m-1"
      onChange={setIsDarkMode}
      checked={isDarkMode}
      size={60}
    />
  );
};