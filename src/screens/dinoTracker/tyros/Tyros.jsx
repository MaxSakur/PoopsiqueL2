import { useState } from "react";
import moment from "moment";
import { generateRBPathByName } from "../../../assets/images/raidBosses";
import { BiAlarmAdd } from "react-icons/bi";
import Button from "../../../components/button";
import { useTranslation } from "react-i18next";
import styles from "./Tyros.module.css";
import { fmtMSS, move } from "../../../utils/helpers";

const DEFAULT_TYROS_RESP = 5;

const Tyros = ({ el }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentItem, setCurrentItem] = useState(el);
  const { t } = useTranslation();

  const setRespCountdown = () => {
    setIsActive(false);
    const currentTimeWithDelay = moment().add(DEFAULT_TYROS_RESP, "minutes");
    setCurrentItem({ ...currentItem, cd: currentTimeWithDelay });
  };

  const contentConditions = () => {
    if (currentItem.cd !== null && !isActive) {
      let restOfTime = currentItem.cd.diff(moment(), "seconds");
      if (currentItem.cd.diff(moment(), "seconds") <= 0) {
        setIsActive(true);
        move.play();
      }

      return <p className={styles.timer_value}>{fmtMSS(restOfTime)}</p>;
    }
    return (
      <Button
        onClick={setRespCountdown}
        label={t("buttons.add")}
        icon={<BiAlarmAdd />}
      />
    );
  };
  return (
    <div className={isActive ? styles.tyros_active : styles.tyros}>
      <div
        className={styles.tyros_index}
        style={{ backgroundImage: `url(${generateRBPathByName("Dino")})` }}
      >
        <p>{el.id + 1}</p>
      </div>

      <div className={styles.timer}>
        {isActive ? (
          <Button
            onClick={setRespCountdown}
            label={t("buttons.add")}
            icon={<BiAlarmAdd />}
          />
        ) : (
          contentConditions()
        )}
      </div>
    </div>
  );
};

export default Tyros;
