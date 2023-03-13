import React, { useState, memo } from "react";
import styles from "./Button.module.css";

const Button = ({
  label,
  icon,
  onClick,
  disabled = false,
  externalLink,
  size = "sm",
}) => {
  const [isHovered, changeIsHovered] = useState(false);
  const handleDisabled = () => changeIsHovered(false);
  const handleActive = () => changeIsHovered(true);

  const iconStyleConditions =
    size === "xl"
      ? { width: "100%", height: "100%" }
      : { width: "60px", height: "60px" };

  const Content = () => {
    return isHovered && label ? (
      <div className={styles.label_container}>
        <p style={{ fontSize: size === "xl" ? 20 : 12 }}>{label}</p>
      </div>
    ) : (
      <div className={styles.icon_container}>{icon}</div>
    );
  };

  return externalLink ? (
    <a
      href={externalLink}
      className={styles.container}
      style={iconStyleConditions}
      onMouseOver={handleActive}
      onMouseLeave={handleDisabled}
      rel="noreferrer"
      target="_blank"
    >
      <Content />
    </a>
  ) : (
    <div
      className={styles.container}
      onMouseOver={handleActive}
      onMouseLeave={handleDisabled}
      style={iconStyleConditions}
      onClick={!disabled && onClick}
    >
      <Content />
    </div>
  );
};

export default memo(Button);
