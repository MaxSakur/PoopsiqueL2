import styles from "./Header.module.css";
import logo from "./../../images/L2logo.png";
import moment from "moment";
import { useEffect, useState } from "react";

export const Header = () => {
  const now = moment().format("HH:mm:ss");
  const [currentTime, updateCurrentTime] = useState("");

  useEffect(() => {
    setTimeout(() => updateCurrentTime(now), 1000);
  }, [now]);

  return (
    <div className={styles.header}>
      <p>Ave, Poopsique</p>
      <img src={logo} alt="" />
      <p>Сейчас: {currentTime}</p>
    </div>
  );
};
