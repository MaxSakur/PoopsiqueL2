import {
  getRespownTime,
  restOfTime,
} from "../../screens/raid_list/raidListHelpers";
import { RiCloseFill } from "react-icons/ri";
import Button from "../button";
import styles from "./RespownList.module.css";
import RaidBossName from "../raidBossName/RaidBossName";
import { useTranslation } from "react-i18next";
import { BsArrowDownLeft } from "react-icons/bs";

const RespownList = ({ data, removeRespownedBoss }) => {
  const { t } = useTranslation();

  return data ? (
    <ul className={styles.raidList}>
      {data.length > 0 ? (
        data
          .sort((a, b) => {
            return a["time"] - b["time"];
          })
          .map((el, index) => {
            if (el.time) {
              return (
                <li key={index} className={styles.raidList_item}>
                  <Button
                    icon={<RiCloseFill />}
                    label={t("buttons.delete")}
                    onClick={() => removeRespownedBoss(el)}
                  />
                  <RaidBossName value={el} />
                  <div className={styles.raidList_item_respown}>
                    <p className={styles.rest}>{restOfTime(el)}</p>
                    <p className={styles.fixed}>{getRespownTime(el)}</p>
                  </div>
                </li>
              );
            }
            return null;
          })
      ) : (
        <div className={styles.hint_container}>
          <div className={styles.icon_container}>
            <Button icon={<BsArrowDownLeft />} size="xl" />
          </div>
          <p className={styles.hint}>{t("respownList.hint")}</p>
        </div>
      )}
    </ul>
  ) : null;
};

export default RespownList;
