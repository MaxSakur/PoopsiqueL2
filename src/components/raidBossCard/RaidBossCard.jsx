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
    <div className={styles.activeContainer}>
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
                size={60}
                isPlaying
                strokeWidth={4}
                duration={maxSeconds}
                initialRemainingTime={diff}
                colors={["green", "yellow", "red"]}
                colorsTime={[
                  getMaxRespTime(value) / 3,
                  getMaxRespTime(value) / 2,
                  getMaxRespTime(value) / 1,
                ]}
                onComplete={() => {
                  onDeleteItem(value);
                  return { shouldRepeat: false, delay: 5 };
                }}
              >
                {({ color, remainingTime }) => (
                  <p className={styles.counter} style={{ color }}>
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
          <button onClick={onClose}>Close</button>
          <button onClick={onSuccess}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default RaidBossCard;
