import { useEffect, useState } from "react";
import styles from "./RaidList.module.css";
import moment from "moment";
import Column from "../../components/column";
import AddNewTimerModal from "./addNewTimerModal";
import raidBossData from "../../static_data/raid_boss_interlude.json";
export const RAID_BOSS_DATA = "raid_boss_data";
// SOUNDS
let move = new Audio();
move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";

export const RaidList = () => {
  const [raidBossList, updateRaidBossList] = useState(raidBossData);
  const cachedRaidBossData =
    localStorage.getItem(RAID_BOSS_DATA) &&
    JSON.parse(localStorage.getItem(RAID_BOSS_DATA));
  const [activeItem, changeActiveItem] = useState();
  const [loading, changeLoading] = useState(false);
  const [respownedBoss, changeRespownedBoss] = useState([]);

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
        move.play();
      }
      return null;
    });
    setTimeout(() => changeLoading(!loading), 20000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const removeCurrentItem = (name) => {
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

  return (
    <div className={styles.mainContainer}>
      <Column
        headContent={<h2>Напоминания</h2>}
        bodyContent={<p>В процессе разработки</p>}
      />
      <Column
        headContent={
          <h2>
            Очередь респауна
            <AddNewTimerModal
              data={updatedRaidBossList}
              value={activeItem}
              onChangeData={updateRaidBossList}
              onChangeActiveItem={changeActiveItem}
            />
          </h2>
        }
        bodyContent={
          cachedRaidBossData &&
          cachedRaidBossData.length > 0 &&
          cachedRaidBossData
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
                      onClick={() => removeCurrentItem(el.name)}
                    >
                      х
                    </button>
                    <p className={styles.raidList_item_name}>{el.name}</p>
                    <p className={styles.raidList_item_label}>
                      {generateNextRespTime(el)}
                    </p>
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
                  <div className={styles.respawn}>
                    <h3>{el.name}</h3>
                  </div>
                );
              })}
          </ul>
        }
      />
    </div>
  );
};
