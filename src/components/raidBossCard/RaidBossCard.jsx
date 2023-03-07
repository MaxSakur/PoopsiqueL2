import { generatePathByName } from "../../images";
import {
  getMaxRespTime,
  toTimeString,
} from "../../screens/raid_list/raidListHelpers";
import RaidBossName from "../raidBossName/RaidBossName";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./RaidBossCard.module.css";

const RaidBossCard = ({
  value,
  content,
  onDeleteItem,
  buttons,
  withBackTimer = false,
}) => {
  const { maxSeconds, diff } = getMaxRespTime(value);
  return (
    <li className={styles.activeContainer}>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url("${generatePathByName(value.name)}")` }}
      />

      <div className={styles.valueInfoContainer}>
        <div className={styles.header}>
          <RaidBossName value={value} />
        </div>

        {content}
        <div className={styles.buttons}>{buttons}</div>
      </div>

      {withBackTimer && (
        <div className={styles.backtimer}>
          <CountdownCircleTimer
            size={66}
            isPlaying
            strokeWidth={2}
            updateInterval={3600}
            duration={diff}
            initialRemainingTime={maxSeconds}
            colors={["#058DD9", "#058DD9", "#058DD9"]}
            colorsTime={[maxSeconds, maxSeconds % 2, maxSeconds % 3]}
            onComplete={() => {
              onDeleteItem(value);
              return { shouldRepeat: false, delay: 1.5 };
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
    </li>
  );
};

export default RaidBossCard;
