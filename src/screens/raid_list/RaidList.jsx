import styles from "./RaidList.module.css";
import Column from "../../components/column";
import Icon from "../../components/button";
import { MdDeleteForever } from "react-icons/md";
import {
  getItemWithRespownTime,
  clearAllCachedData,
  RAID_BOSS_DATA,
} from "./raidListHelpers";
import { useEffect, useState } from "react";
import AddNewTimerModal from "./addNewTimerModal";

// SOUNDS
let move = new Audio();
move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";

export const RaidList = () => {
  const [cachedDataWithTime, changeCachedDataWithTime] = useState([]);
  const [currentRBwithTime, changeCurrentRBwithTime] = useState();

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

  // REHYDRATE CACHED DATA
  useEffect(() => {
    const data = localStorage.getItem(RAID_BOSS_DATA);
    if (data) {
      changeCachedDataWithTime(JSON.parse(data));
    }
  }, []);

  // GET CACHED DATA
  useEffect(() => {
    localStorage.setItem(RAID_BOSS_DATA, JSON.stringify(cachedDataWithTime));
  });

  const removeRespownedBoss = (boss) => {
    changeCachedDataWithTime(
      cachedDataWithTime.filter((el) => el.name !== boss.name)
    );
  };

  return (
    <div className={styles.mainContainer}>
      <Column
        headContent={<h2>Server settings</h2>}
        // bodyContent={<p>В процессе разработки</p>}
      />
      <Column
        iconLeft={
          <Icon icon={<MdDeleteForever />} onClick={handleClearCachedData} />
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
          cachedDataWithTime.length > 0
            ? cachedDataWithTime
                .sort((a, b) => {
                  return a["time"] - b["time"];
                })
                .map((el, index) => {
                  if (el.time) {
                    return (
                      <li key={index} className={styles.raidList_item}>
                        <button
                          className={styles.removeButton}
                          onClick={() => removeRespownedBoss(el.name)}
                        >
                          х
                        </button>

                        <p className={styles.raidList_item_name}>{el.name}</p>
                        <p className={styles.raidList_item_label}>
                          Время респа: {"   "}
                          {/* {generateNextRespTime(el)} */}
                        </p>
                        {/* <p>Через: {restOfTime(el)}</p> */}
                      </li>
                    );
                  }
                  return null;
                })
            : null
        }
      />

      <Column
        headContent={<h2>On respown</h2>}
        // bodyContent={
        //   <ul className={styles.raidList}>
        //     {respownedBoss &&
        //       respownedBoss?.map((el) => {
        //         return (
        //           <RaidBossCard
        //             value={el}
        //             onSuccess={refreshBossTimer}
        //             onReject={removeRespownedBoss}
        //           />
        //         );
        //       })}
        //   </ul>
        // }
      />
    </div>
  );
};
