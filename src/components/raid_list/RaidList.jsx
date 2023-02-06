import { useEffect, useState } from "react";
import list from "./../../static_data/raid_boss_interlude.json";
import styles from "./RaidList.module.css";
import moment from "moment";

// SOUNDS
let move = new Audio();
move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";

export const RaidList = () => {
  const todaysDate = moment().format("YYYY-MM-DD");
  const [сurrentDate, changeCurrentDate] = useState(todaysDate);
  const [respownList, updateRespownList] = useState([]);
  const [respownedBoss, updateRespownedBoss] = useState("");
  const nowMS = moment().format("HH:mm");
  const now = moment();
  const [currentTime, updateCurrentTime] = useState("");

  const generateNextRespTime = (el) => {
    const { time, respTime } = el;
    return moment(time, "x").add(respTime, "hours").format("HH:mm");
  };

  useEffect(() => {
    respownList.map((el) => {
      if (generateNextRespTime(el) === nowMS) {
        updateRespownedBoss(el.name);
        move.play();
      }
      return null;
    });
    setTimeout(() => updateCurrentTime(now), 10000);
  }, [now, respownList]);

  const generateKilledTime = (time, el) => {
    if (moment(time, "HH:mm").isValid()) {
      updateRespownList([
        ...respownList,
        {
          ...el,
          time: moment(time, "HH:mm").format("x"),
        },
      ]);
    }
    changeCurrentDate(todaysDate);
  };

  const removeCurrentItem = (name) => {
    updateRespownList(respownList.filter((el) => el.name !== name));
  };

  return (
    <div className={styles.mainContainer}>
      {/* RAID LIST */}
      <ul className={styles.raidList}>
        <h2>Список РБ</h2>
        {list.map((el) => (
          <li className={styles.raidList_item} key={el.name}>
            <p className={styles.raidList_item_name}>
              {el.lvl} , {el.name}
            </p>
            <input
              type="date"
              className={styles.timeInput}
              value={сurrentDate}
              max={сurrentDate}
              onChange={(e) => changeCurrentDate(e.target.value)}
            />
            <input
              type="time"
              className={styles.timeInput}
              onBlur={(event) => {
                generateKilledTime(event.target.value, el);
                event.target.value = "";
              }}
            />
          </li>
        ))}
      </ul>

      {/* RESP TIME */}
      <ul className={styles.raidList}>
        {respownedBoss && (
          <div className={styles.respawn}>
            <h2>ПОШЕЛ РЕСП</h2>
            <h3>{respownedBoss}</h3>
          </div>
        )}

        <h2>Очередь респауна</h2>
        {respownList
          .sort((a, b) => a["time"] - b["time"])
          .map((el) => (
            <li className={styles.raidList_item}>
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
          ))}
      </ul>
    </div>
  );
};
