import React from "react";
import styles from "./Column.module.css";

const Column = ({ headContent, bodyContent }) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>{headContent}</div>
      <div className={styles.body}>{bodyContent}</div>
    </div>
  );
};

export default Column;
