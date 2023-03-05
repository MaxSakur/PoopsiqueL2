import moment from "moment";
import React, { useMemo, useState } from "react";
import { DEFAULT_TIME_FORMAT } from "../raid_list/raidListHelpers";
import { generatePathByName } from "../../images";
import styles from "./DinoTracker.module.css";

const Tyros = ({ el, index }) => {
  return (
    <div className={styles.tyros}>
      <div
        className={styles.tyros_index}
        style={{ backgroundImage: `url(${generatePathByName("Dino")})` }}
      >
        <p>{index + 1}</p>
      </div>
      <div className={styles.timer}>
        {moment(el.time, DEFAULT_TIME_FORMAT).isValid() ? (
          <p>{moment(el.time, DEFAULT_TIME_FORMAT).toNow(true)}</p>
        ) : (
          <p>`ALT + ${index + 1}`</p>
        )}
      </div>
    </div>
  );
};

const DinoTracker = () => {
  const [keysPressed, updateKeyPressed] = useState({});
  const [tyros, setTyros] = useState(new Array(6).fill({}));
  const getCode = (e) => {
    e = e || window.event;
    return e.key;
  };

  useMemo(() => {
    document.addEventListener("keydown", (event) => {
      if (event.altKey === true && isFinite(getCode(event))) {
        if (Number(event.key) <= 5) {
          let arr = tyros;
          arr[Number(event.key)] = {
            time: moment().add(5, "minutes").format(DEFAULT_TIME_FORMAT),
          };
          setTyros(arr);
          console.log(Number(event.key), tyros, "tyros");
        }
      }
    });

    document.removeEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });
  }, [keysPressed]);

  return (
    <div>
      {tyros?.slice(1, tyros.length).map((el, index) => (
        <Tyros key={index} el={el} index={index} />
      ))}
    </div>
  );
};

export default DinoTracker;
