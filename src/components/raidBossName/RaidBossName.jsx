import React from "react";
import { memo } from "react";
import styles from "./RaidBossName.module.css";

const RaidBossName = ({ value }) => {
  return (
    <div className={styles.container}>
      <p className={styles.name}>
        {" "}
        <span className={styles.typeLvl}>Lv:{value.lvl},</span> {value.name}
      </p>
    </div>
  );
};

export default memo(RaidBossName);
