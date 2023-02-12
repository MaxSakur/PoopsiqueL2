import React from "react";
import styles from "./Icon.module.css";

const Icon = ({ onClick, icon }) => {
  return (
    <div onClick={onClick} className={styles.container}>
      {icon}
    </div>
  );
};

export default Icon;
