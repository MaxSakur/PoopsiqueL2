import styles from "./RaidList.module.css";
import Column from "../../components/column";
import Icon from "../../components/button";
import { MdDeleteForever } from "react-icons/md";
import {
  RAID_BOSS_DATA,
  getItemWithRespownTime,
  clearAllCachedData,
  restOfTime,
  getRespownTime,
  currentTime,
  convertMsToTime,
  RESPOWNED_DATA,
} from "./raidListHelpers";
import { useEffect, useState } from "react";
import AddNewTimerModal from "./addNewTimerModal";
import RaidBossCard from "../../components/raidBossCard";

// SOUNDS
let move = new Audio();
move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";

export const RaidList = () => {
  const [cachedDataWithTime, changeCachedDataWithTime] = useState([]);
  const [respownedBoss, changeRespownedBoss] = useState([]);
  const [currentRBwithTime, changeCurrentRBwithTime] = useState();
  const [loading, changeLoading] = useState(false);
  // DELETE ALL CACHED RESP DATA
  const handleClearCachedData = () => {
    clearAllCachedData();
    changeCachedDataWithTime([]);
  };

  // ADD NEW CACHED ITEM RESP DATA
  const addNewCachebleItem = (el, time) => {
    const newItemWithTime = getItemWithRespownTime(el, time);
    if (newItemWithTime) {
      changeCachedDataWithTime([...cachedDataWithTime, newItemWithTime]);
    }
  };

  useEffect(() => {
    // INITIALIZE CACHED DATA
    if (cachedDataWithTime.length > 0) {
      localStorage.setItem(RAID_BOSS_DATA, JSON.stringify(cachedDataWithTime));
    }
    // INITIALIZE RESPOWNED DATA
    if (respownedBoss.length > 0) {
      localStorage.setItem(RESPOWNED_DATA, JSON.stringify(respownedBoss));
    }
  }, [respownedBoss, cachedDataWithTime]);

  useEffect(() => {
    // REHYDRATE CACHED DATA
    const data = localStorage.getItem(RAID_BOSS_DATA);
    if (data) {
      changeCachedDataWithTime(JSON.parse(data));
    }
    // REHYDRATE RESPOWNED DATA
    const respowedData = localStorage.getItem(RESPOWNED_DATA);
    if (respowedData) {
      changeRespownedBoss(JSON.parse(respowedData));
    }
  }, []);

  // DELETE ONE ITEM FROM CACHED DATA
  const removeRespownedBoss = (boss) => {
    changeCachedDataWithTime(
      cachedDataWithTime.filter((el) => el.name !== boss.name)
    );
  };

  // COUNTER CHECK
  useEffect(() => {
    if (cachedDataWithTime) {
      cachedDataWithTime?.map((el) => {
        if (convertMsToTime(el.time) === currentTime()) {
          removeRespownedBoss(el);
          changeRespownedBoss([
            ...respownedBoss.filter((item) => item.name !== el.name),
            el,
          ]);
          move.play();
        }
        return null;
      });
    }
    setTimeout(() => changeLoading(!loading), 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className={styles.mainContainer}>
      <Column
        headContent={<h2>Server settings</h2>}
        // bodyContent={<p>В процессе разработки</p>}
      />
      <Column
        iconLeft={
          <Icon
            color={"red"}
            icon={<MdDeleteForever />}
            onClick={handleClearCachedData}
          />
        }
        iconRight={
          <AddNewTimerModal
            value={currentRBwithTime}
            onSuccess={addNewCachebleItem}
            onChangeActiveItem={changeCurrentRBwithTime}
          />
        }
        headContent={
          <div className={styles.row}>
            <h2>Respown list</h2>
          </div>
        }
        bodyContent={
          <ul>
            {cachedDataWithTime.length > 0
              ? cachedDataWithTime
                  .sort((a, b) => {
                    return a["time"] - b["time"];
                  })
                  .map((el, index) => {
                    if (el.time) {
                      return (
                        <li key={index} className={styles.raidList_item}>
                          <Icon
                            color={"red"}
                            icon={<MdDeleteForever />}
                            onClick={() => removeRespownedBoss(el)}
                          />
                          <p className={styles.raidList_item_name}>
                            <span>{el.lvl}</span>, {el.name}
                          </p>
                          <div className={styles.raidList_item_respown}>
                            <p>{restOfTime(el)}</p>
                            <p className={styles.raidList_item_label}>
                              {getRespownTime(el)}
                            </p>
                          </div>
                        </li>
                      );
                    }
                    return null;
                  })
              : null}
          </ul>
        }
      />

      <Column
        headContent={<h2>On respown</h2>}
        bodyContent={
          <ul className={styles.raidList}>
            {respownedBoss &&
              respownedBoss?.map((el, index) => {
                return (
                  <RaidBossCard
                    key={index}
                    value={el}
                    onSuccess={() => {}}
                    onReject={removeRespownedBoss}
                  />
                );
              })}
          </ul>
        }
      />
    </div>
  );
};
