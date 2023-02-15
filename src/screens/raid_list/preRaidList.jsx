import { useEffect, useMemo, useState } from "react";
import styles from "./RaidList.module.css";
import moment from "moment";
import Column from "../../components/column";
import AddNewTimerModal from "./addNewTimerModal";
import staticRaidBossData from "../../static_data/raid_boss_interlude.json";
import RaidBossCard from "../../components/raidBossCard";
import {
  cachedRaidBossData,
  clearCachedData,
  generateNextRespTime,
  removeRespownItem,
  removeRespownedBoss,
  restOfTime,
  updateCachedListWithRespownTime,
} from "./raidListHelpers";
import { MdDeleteForever } from "react-icons/md";
import Icon from "../../components/button";
export const RAID_BOSS_DATA = "raid_boss_data";
// SOUNDS
let move = new Audio();
move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";

export const RaidList = () => {
  const [activeItem, changeActiveItem] = useState();
  const [respownedBoss, changeRespownedBoss] = useState([]);
  const [loading, changeLoading] = useState(false);
  const nowMS = moment().format("HH:mm");

  const getCachedRaidBossList = useMemo(() => {
    return localStorage.getItem(RAID_BOSS_DATA)
      ? localStorage.getItem(RAID_BOSS_DATA)
      : [];
  }, [respownedBoss]);

  useEffect(() => {
    if (getCachedRaidBossList) {
      getCachedRaidBossList?.map((el) => {
        if (generateNextRespTime(el) === nowMS) {
          changeRespownedBoss([
            ...respownedBoss.filter((item) => item.name !== el.name),
            el,
          ]);
          removeRespownItem(el.name);
          move.play();
        }
        return null;
      });
    }

    setTimeout(() => changeLoading(!loading), 20000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const updatedRaidBossList = staticRaidBossData.reduce((prev, el) => {
    if (getCachedRaidBossList) {
      return getCachedRaidBossList?.some((item) => item.name === el.name)
        ? prev
        : [...prev, el];
    }
    return null;
  }, []);

  const refreshBossTimer = (boss) => {};

  const handleClearCachedData = () => {
    cachedRaidBossData.setData([]).then(() => cachedRaidBossData.getData());
  };

  const addNewCachebleItem = (el, time) => {
    el && updateCachedListWithRespownTime(el, time);
  };

  return (
    <div className={styles.mainContainer}>
      <Column
        headContent={<h2>Напоминания</h2>}
        bodyContent={<p>В процессе разработки</p>}
      />
      <Column
        iconLeft={
          <Icon icon={<MdDeleteForever />} onClick={handleClearCachedData} />
        }
        iconRight={
          <AddNewTimerModal
            data={updatedRaidBossList}
            value={activeItem}
            onSuccess={addNewCachebleItem}
            onChangeActiveItem={changeActiveItem}
          />
        }
        headContent={
          <div className={styles.row}>
            <h2>Очередь респауна</h2>
          </div>
        }
        bodyContent={
          getCachedRaidBossList &&
          getCachedRaidBossList.length > 0 &&
          getCachedRaidBossList
            .filter((el) => el.time)
            .sort((a, b) => {
              return a["time"] - b["time"];
            })
            .map((el, index) => {
              if (el.time) {
                return (
                  <li key={index} className={styles.raidList_item}>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeRespownItem(el.name)}
                    >
                      х
                    </button>

                    <p className={styles.raidList_item_name}>{el.name}</p>
                    <p className={styles.raidList_item_label}>
                      Время респа: {"   "}
                      {generateNextRespTime(el)}
                    </p>
                    <p>Через: {restOfTime(el)}</p>
                  </li>
                );
              } else {
                return null;
              }
            })
        }
      />

      <Column
        headContent={<h2>ПОШЕЛ РЕСП</h2>}
        bodyContent={
          <ul className={styles.raidList}>
            {respownedBoss &&
              respownedBoss?.map((el) => {
                return (
                  <RaidBossCard
                    value={el}
                    onSuccess={refreshBossTimer}
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
