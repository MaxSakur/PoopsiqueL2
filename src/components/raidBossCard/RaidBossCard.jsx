import React from "react";
import styles from "./RaidBossCard.module.css";
import { generatePathByName } from "../../images";

const RaidBossCard = ({ value, content, onSuccess, onReject }) => {
  return (
    <div className={styles.activeContainer}>
      <img
        className={styles.image}
        src={generatePathByName(value.name)}
        alt={`${value.value} portrait`}
      />
      <div className={styles.valueInfoContainer}>
        <div>
          <p className={styles.name}>
            {value.name}, {value.lvl} lvl
          </p>
          <p className={styles.location}>{value.location}</p>
        </div>

        {content}
        <div className={styles.buttons}>
          <button onClick={onReject}>Close</button>
          <button onClick={onSuccess}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default RaidBossCard;
