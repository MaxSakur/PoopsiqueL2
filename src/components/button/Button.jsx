import React, { useState } from "react";
import styles from "./Button.module.css";

const Button = ({ label, icon, onClick, externalLink, size = "sm" }) => {
  const [isHovered, changeIsHovered] = useState(false);
  const handleDisabled = () => changeIsHovered(false);
  const handleActive = () => changeIsHovered(true);

  const Content = () => {
    return isHovered ? (
      <div className={styles.label_container}>
        <p>{label}</p>
      </div>
    ) : (
      <div className={styles.icon_container}>{icon}</div>
    );
  };

  const iconStyleConditions =
    size === "xl"
      ? { width: "100%", height: "100%" }
      : { width: "60px", height: "60px" };

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
      onClick={onClick}
    >
      <Content />
    </div>
  );
};

export default Button;
