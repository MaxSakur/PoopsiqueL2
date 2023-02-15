import { useState } from "react";
import styles from "./Icon.module.css";

const Icon = ({ onClick, icon, color = "#000", hoverColor = color }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const addStyles = {
    color: isHover ? hoverColor : color,
    border: `1px solid ${isHover ? hoverColor : color}`,
  };

  return (
    <div
      onClick={onClick}
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={addStyles}
    >
      {icon}
    </div>
  );
};

export default Icon;
