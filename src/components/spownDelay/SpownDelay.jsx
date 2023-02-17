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

  const handleChangeDefaultSpown = (el) => {
    changeSpownDelay({ ...spownDelay, all: Number(el.target.value) });
  };
  const handleChangeRandomSpown = (el) => {
    changeSpownDelay({ ...spownDelay, random: Number(el.target.value) });
  };
  const handleChangeAllianceSpown = (el) => {
    changeSpownDelay({ ...spownDelay, alliance: Number(el.target.value) });
  };
  const handleChangeNoblessSpown = (el) => {
    changeSpownDelay({ ...spownDelay, nobless: Number(el.target.value) });
  };

  return (
    <div className={styles.list}>
      {spownDelay && (
        <>
          <div className={styles.list_item}>
            <div>
              <p className={styles.list_item_value}>Base respown time</p>
              <p className={styles.list_item_label}>
                Main time of respown of all raid bosses
              </p>
            </div>
            <input
              type="number"
              className={styles.list_item_input}
              onChange={handleChangeDefaultSpown}
              value={spownDelay.all}
            />
          </div>
          <div className={styles.list_item}>
            <div>
              <p className={styles.list_item_value}>Default random time</p>
              <p className={styles.list_item_label}>
                Random time, when boss can be spowned
              </p>
            </div>
            <input
              type="number"
              className={styles.list_item_input}
              onChange={handleChangeRandomSpown}
              value={spownDelay.random}
            />
          </div>
          <div className={styles.list_item}>
            <div>
              <p className={styles.list_item_value}>Alliance random time</p>
              <p className={styles.list_item_label}>
                Random time, when Ketra/Varka 4/5 lvl bosses can be spawned
              </p>
            </div>
            <input
              type="number"
              className={styles.list_item_input}
              onChange={handleChangeAllianceSpown}
              value={spownDelay.alliance}
            />
          </div>
          <div className={styles.list_item}>
            <div>
              <p className={styles.list_item_value}>Nobless random time</p>
              <p className={styles.list_item_label}>
                Random additional time, when nobless boss can be spawned
              </p>
            </div>
            <input
              type="number"
              className={styles.list_item_input}
              onChange={handleChangeNoblessSpown}
              value={spownDelay.nobless}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SpownDelay;
