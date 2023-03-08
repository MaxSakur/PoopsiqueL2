import styles from "./Header.module.css";
import logo from "./../../images/L2logo.png";
import moment from "moment";
import { useEffect, useState } from "react";
import Icon from "../icon";
import { BsClock } from "react-icons/bs";
import i18n, { lngs } from "../../utils/i18next";

export const Header = () => {
  const now = moment().format("HH:mm:ss");
  const [currentTime, updateCurrentTime] = useState("");
  const [toggle, setToggleChange] = useState(true);

  Object.keys(lngs).map((lng) => i18n.changeLanguage(lng));

  useEffect(() => {
    setTimeout(() => updateCurrentTime(now), 1000);
  }, [now]);

  //  <FormControlLabel
  //         control={
  //           <Switchn
  //             checked={toggle}
  //             onChange={handleLanguageChange}
  //             aria-label="login switch"
  //           />
  //         }
  //         label={toggle ? 'EN' : 'UA'}
  //       />

  return (
    <div className={styles.header}>
      <p>Ave, Poopsique</p>
      <img src={logo} alt="" />
      <div className={styles.time}>
        <Icon color={"#fff"} noBorder icon={<BsClock />} /> <p>{currentTime}</p>
      </div>
    </div>
  );
};
