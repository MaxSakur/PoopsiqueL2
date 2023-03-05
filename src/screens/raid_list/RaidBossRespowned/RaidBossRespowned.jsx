import React, { useState, useEffect } from "react";
import Column from "../../../components/column";
import styles from "./RaidBossRespowned.module.css";
import { RESPOWNED_DATA } from "../raidListHelpers";
import RaidBossCard from "../../../components/raidBossCard";

const RaidBossRespowned = ({ respownedBoss, changeRespownedBoss }) => {
  useEffect(() => {
    // INITIALIZE RESPOWNED DATA
    if (respownedBoss) {
      localStorage.setItem(RESPOWNED_DATA, JSON.stringify(respownedBoss));
    }
  }, [respownedBoss]);

  useEffect(() => {
    // REHYDRATE RESPOWNED DATA
    const respowedData = localStorage.getItem(RESPOWNED_DATA);
    if (respowedData) {
      changeRespownedBoss(JSON.parse(respowedData));
    }
  }, []);

  // DELETE ONE ITEM FROM RESPOWNED DATA
  const removeRespownedBoss = (boss) => {
    changeRespownedBoss(() =>
      respownedBoss.filter((el) => el.name !== boss.name)
    );
  };

  // RESET RESPOWNING EL TO CHECKED DATA
  const resetRespowningElement = (el) => {
    removeRespownedBoss(el);
    // changeCachedDataWithTime([...cachedDataWithTime, addDefaultTimeToItem(el)]);
  };

  return (
    <Column
      headContent={<h2>Respown in any minute</h2>}
      bodyContent={
        <ul className={styles.raidList}>
          {respownedBoss &&
            respownedBoss.map((el, index) => {
              return (
                <RaidBossCard
                  key={index}
                  withBackTimer={true}
                  value={el}
                  onSuccess={() => resetRespowningElement(el)}
                  onClose={() => removeRespownedBoss(el)}
                  onDeleteItem={removeRespownedBoss}
                />
              );
            })}
        </ul>
      }
    />
  );
};

export default RaidBossRespowned;
