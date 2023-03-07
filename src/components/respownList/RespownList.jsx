import {
  getRespownTime,
  restOfTime,
} from "../../screens/raid_list/raidListHelpers";
import { RiCloseFill } from "react-icons/ri";
import Button from "../button";
import styles from "./RespownList.module.css";
import RaidBossName from "../raidBossName/RaidBossName";

const RespownList = ({ data, removeRespownedBoss }) => {
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
                    label="Delete"
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
        <p style={{ color: "#fff" }}>
          Start adding respowns of raid bosses
          <br /> on left bottom corner of the screen
        </p>
      )}
    </ul>
  ) : null;
};

export default RespownList;
