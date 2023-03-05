import { useState } from "react";
import RaidBossSettings from "./RaidBossSettings";
import RaidBossWaitingList from "./RaidBossWaitingList";
import RaidBossRespowned from "./RaidBossRespowned";
import styles from "./RaidList.module.css";

export const RaidList = () => {
  const [respownedBoss, changeRespownedBoss] = useState(null);

  const handleAddNewRespowned = (el) => {
    if (respownedBoss && respownedBoss.length > 0) {
      changeRespownedBoss([...respownedBoss, el]);
    } else {
      changeRespownedBoss([el]);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <RaidBossSettings />
      <RaidBossWaitingList onRespownStart={handleAddNewRespowned} />
      <RaidBossRespowned
        respownedBoss={respownedBoss}
        changeRespownedBoss={changeRespownedBoss}
      />
    </div>
  );
};
