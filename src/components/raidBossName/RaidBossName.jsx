import React from "react";
import styles from "./RaidBossName.module.css";

const RaidBossName = ({ value }) => {
  return (
    <div className={styles.container}>
      <p className={styles.typeLvl}>Lvl:{value.lvl} Raid Boss</p>
      <p className={styles.name}>{value.name}</p>
      <p className={styles.label}>Location: {value.location}</p>
    </div>
  );
};

export default RaidBossName;
