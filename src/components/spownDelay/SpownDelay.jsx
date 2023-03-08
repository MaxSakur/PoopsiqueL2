import { useState, useEffect } from "react";
import defaultBossSpownDelay from "../../static_data/default_boss_respawn_timers.json";
import { RAID_BOSS_SPOWN_DELAY } from "../../screens/raid_list/raidListHelpers";
import styles from "./SpownDelay.module.css";
import { useTranslation } from "react-i18next";

const SpownDelay = () => {
  const [spownDelay, changeSpownDelay] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (spownDelay) {
      localStorage.setItem(RAID_BOSS_SPOWN_DELAY, JSON.stringify(spownDelay));
    }
  }, [spownDelay]);

  useEffect(() => {
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
              value={t("server_settings.respown")}
            />
            <input
              type="text"
              disabled
              className={styles.list_item_input}
              value={t("server_settings.random")}
            />
          </div>
          <div className={styles.list_item}>
            <p className={styles.list_item_value}>{t("server_settings.all")}</p>

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
            <p className={styles.list_item_value}>
              {t("server_settings.ketraVarka")}
            </p>

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
            <p className={styles.list_item_value}>
              {t("server_settings.nobless")}
            </p>

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
