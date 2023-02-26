import { useState, useEffect } from "react";
import defaultBossSpownDelay from "../../static_data/default_boss_respawn_timers.json";
import { RAID_BOSS_SPOWN_DELAY } from "../../screens/raid_list/raidListHelpers";
import styles from "./SpownDelay.module.css";

const SpownDelay = () => {
  const [spownDelay, changeSpownDelay] = useState();
  useEffect(() => {
    // INITIALIZE SPOWN DELAY
    if (spownDelay) {
      localStorage.setItem(RAID_BOSS_SPOWN_DELAY, JSON.stringify(spownDelay));
    }
  }, [spownDelay]);

  useEffect(() => {
    // REHYDRATE CACHED DATA
    const data = localStorage.getItem(RAID_BOSS_SPOWN_DELAY);
    if (data) {
      changeSpownDelay(JSON.parse(data));
    } else {
      changeSpownDelay(defaultBossSpownDelay);
    }
  }, []);

  const handleChangeSpownSetting = (param, el) => {
    changeSpownDelay({ ...spownDelay, [param]: Number(el.target.value) });
  };

  return (
    <div className={styles.list}>
      {spownDelay && (
        <>
          <div className={styles.list_item}>
            <p className={styles.list_item_value}></p>
            <input
              type="text"
              disabled
              className={styles.list_item_input}
              value="respown"
            />
            <input
              type="text"
              disabled
              className={styles.list_item_input}
              value="random"
            />
          </div>
          <div className={styles.list_item}>
            <p className={styles.list_item_value}>All Raid Bosses</p>

            <input
              type="number"
              className={styles.list_item_input}
              onChange={(el) =>
                handleChangeSpownSetting("all_bosses_timer", el)
              }
              value={spownDelay.all_bosses_timer}
            />
            <input
              type="number"
              className={styles.list_item_input}
              onChange={(el) =>
                handleChangeSpownSetting("all_bosses_random", el)
              }
              value={spownDelay.all_bosses_random}
            />
          </div>

          <div className={styles.list_item}>
            <p className={styles.list_item_value}>Ketra/Varka (Alliance)</p>

            <input
              type="number"
              className={styles.list_item_input}
              onChange={(el) =>
                handleChangeSpownSetting("alliance_bosses_timer", el)
              }
              value={spownDelay.alliance_bosses_timer}
            />
            <input
              type="number"
              className={styles.list_item_input}
              onChange={(el) =>
                handleChangeSpownSetting("alliance_bosses_random", el)
              }
              value={spownDelay.alliance_bosses_random}
            />
          </div>
          <div className={styles.list_item}>
            <p className={styles.list_item_value}>Barakiel (Nobless)</p>

            <input
              type="number"
              className={styles.list_item_input}
              onChange={(el) => handleChangeSpownSetting("nobless_timer", el)}
              value={spownDelay.nobless_timer}
            />
            <input
              type="number"
              className={styles.list_item_input}
              onChange={(el) => handleChangeSpownSetting("nobless_random", el)}
              value={spownDelay.nobless_random}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SpownDelay;
