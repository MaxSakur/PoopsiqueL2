import React from "react";
import styles from "./ScreenContainer.module.css";

const ScreenContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ScreenContainer;
