import React from "react";
import styles from "./RaidBossCard.module.css";
import { generatePathByName } from "../../images";
import {
  generatePath,
  getMaxRespTime,
  toTimeString,
} from "../../screens/raid_list/raidListHelpers";
import RaidBossName from "../raidBossName/RaidBossName";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Button from "../button";

const RaidBossCard = ({
  value,
  content,
  onSuccess,
  onClose,
  onDeleteItem,
  withBackTimer = false,
}) => {
  const { maxSeconds, diff } = getMaxRespTime(value);
  return (
    <li className={styles.activeContainer}>
      <img
        className={styles.image}
        src={generatePathByName(value.name)}
        alt={`${value.value} portrait`}
      />

      <div className={styles.valueInfoContainer}>
        <div className={styles.header}>
          <RaidBossName value={value} />
          {withBackTimer && (
            <div className={styles.backtimer}>
              <CountdownCircleTimer
                size={80}
                isPlaying
                strokeWidth={4}
                updateInterval={3600}
                duration={maxSeconds}
                initialRemainingTime={diff}
                colorsTime={[maxSeconds, maxSeconds / 2, maxSeconds / 3]}
                colors={["#058DD9"]}
                onComplete={() => {
                  onDeleteItem(value);
                  return { shouldRepeat: false };
                }}
              >
                {({ color, remainingTime }) => (
                  <p className={styles.counter} style={{ color }}>
                    {console.log(color, "color")}
                    {toTimeString(remainingTime)}
                  </p>
                )}
              </CountdownCircleTimer>
            </div>
          )}
        </div>
        {/* DECORATE */}
        {withBackTimer && (
          <>
            <div className={styles.buttons}>
              <button>
                <a href={value.drop} rel="noreferrer" target="_blank">
                  Drop
                </a>
              </button>
              <button>
                <a
                  href={generatePath(value.drop)}
                  rel="noreferrer"
                  target="_blank"
                  disabled
                >
                  Location
                </a>
              </button>
            </div>
          </>
        )}

        {content}
        <div className={styles.buttons}>
          <Button />
          <button onClick={onClose}>Close</button>
          <button onClick={onSuccess}>Add</button>
        </div>
      </div>
    </li>
  );
};

export default RaidBossCard;
