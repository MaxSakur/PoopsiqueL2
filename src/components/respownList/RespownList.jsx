import styles from "./RespownList.module.css";
import Icon from "../icon";
import {
  getRespownTime,
  restOfTime,
} from "../../screens/raid_list/raidListHelpers";
import { MdDeleteForever } from "react-icons/md";

const RespownList = ({ data, removeRespownedBoss }) => {
  return data ? (
    <ul>
      {data.length > 0
        ? data
            .sort((a, b) => {
              return a["time"] - b["time"];
            })
            .map((el, index) => {
              if (el.time) {
                return (
                  <li key={index} className={styles.raidList_item}>
                    <Icon
                      color={"red"}
                      icon={<MdDeleteForever />}
                      onClick={() => removeRespownedBoss(el)}
                    />
                    <p className={styles.raidList_item_name}>
                      <span>{el.lvl}</span>, {el.name}
                    </p>
                    <div className={styles.raidList_item_respown}>
                      <p>{restOfTime(el)}</p>
                      <p className={styles.raidList_item_label}>
                        {getRespownTime(el)}
                      </p>
                    </div>
                  </li>
                );
              }
              return null;
            })
        : null}
    </ul>
  ) : null;
};

export default RespownList;
