import { useEffect, useState } from "react";
import styles from "./RaidList.module.css";
import moment from "moment";
import Column from "../../components/column";
import AddNewTimerModal from "./addNewTimerModal";
import staticRaidBossData from "../../static_data/raid_boss_interlude.json";
import RaidBossCard from "../../components/raidBossCard";
import { clearCachedData, updateCachedRaidBossList } from "./raidListHelpers";
import { HiRefresh } from "react-icons/hi";
import Icon from "../../components/button";
export const RAID_BOSS_DATA = "raid_boss_data";
// SOUNDS
let move = new Audio();
move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";

export const RaidList = () => {
  const [raidBossList, updateRaidBossList] = useState(staticRaidBossData);
  const cachedRaidBossData =
    localStorage.getItem(RAID_BOSS_DATA) &&
    JSON.parse(localStorage.getItem(RAID_BOSS_DATA));
  const [activeItem, changeActiveItem] = useState();
  const [loading, changeLoading] = useState(false);
  const [respownedBoss, changeRespownedBoss] = useState([]);
  moment.locale("ru");
  const nowMS = moment().format("HH:mm");

  const generateNextRespTime = (el) => {
    const { time, respTime } = el;
    return moment(time, "x").add(respTime, "hours").format("HH:mm");
  };

  useEffect(() => {
    cachedRaidBossData?.map((el) => {
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
    setTimeout(() => changeLoading(!loading), 20000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const removeRespownItem = (name) => {
    localStorage.setItem(
      RAID_BOSS_DATA,
      JSON.stringify(cachedRaidBossData.filter((el) => el.name !== name))
    );
    changeLoading(!loading);
  };

  const updatedRaidBossList = raidBossList.reduce((prev, el) => {
    return cachedRaidBossData?.some((item) => item.name === el.name)
      ? prev
      : [...prev, el];
  }, []);

  const refreshBossTimer = (boss) => {};

  const handleClearCachedData = () => {
    clearCachedData();
    changeLoading(!loading);
  };

  const removeRespownedBoss = (boss) => {
    changeRespownedBoss(respownedBoss.filter((el) => el.name !== boss.name));
  };

  const addNewCachebleItem = (el, time) => {
    el && updateCachedRaidBossList(el, time);
  };

  const restOfTime = ({ time, respTime }) => {
    // MOS "1676279460000"
    // CABRIO "1676279460000"
    // console.log(time, respTime);
    // console.log("1", moment("1676279460000", "x").add(respTime, "hours"));
    console.log("через 6", moment(time, "x").add(6, "h").format("HH:mm"));
    console.log("через 12", moment(time, "x").add(12, "h").format("HH:mm"));
    return moment(time, "x").add(respTime, "hours").toNow();
  };

  return (
    <div className={styles.mainContainer}>
      <Column
        headContent={<h2>Напоминания</h2>}
        bodyContent={<p>В процессе разработки</p>}
      />
      <Column
        iconLeft={<Icon icon={<HiRefresh />} onClick={handleClearCachedData} />}
        iconRight={
          <AddNewTimerModal
            data={updatedRaidBossList}
            value={activeItem}
            onSuccess={addNewCachebleItem}
            onChangeData={updateRaidBossList}
            onChangeActiveItem={changeActiveItem}
          />
        }
        headContent={
          <div className={styles.row}>
            <h2>Очередь респауна</h2>
          </div>
        }
        bodyContent={
          cachedRaidBossData &&
          cachedRaidBossData.length > 0 &&
          cachedRaidBossData
            .filter((el) => el.time)
            .sort((a, b) => {
              console.log(cachedRaidBossData, a, b);
              return a["time"] - b["time"];
            })
            .map((el, index) => {
              if (el.time) {
                return (
                  <li key={index} className={styles.raidList_item}>
                    {/* {console.log(el)} */}
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
