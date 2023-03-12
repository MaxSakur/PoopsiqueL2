import styles from "./Header.module.css";
import logo from "../../assets/images/L2logo.png";
import moment from "moment";
import { useEffect, useState } from "react";
import Icon from "../icon";
import { BsClock } from "react-icons/bs";
import i18n, { lngs } from "../../utils/i18next";
import { Link } from "react-router-dom";

export const Header = () => {
  const now = moment().format("HH:mm:ss");
  const [currentTime, updateCurrentTime] = useState("");
  const [toggle, setToggleChange] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
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

  const navigationData = [
    { label: "Raid Boss Hunter", link: "/rb" },
    { label: "Dino Tracker", link: "/dino" },
    { label: "Craft Calculator", link: "/craft" },
    { label: "Market Analyzer", link: "/market" },
  ];

  const handleSetActive = (item) => {
    const activeItem = navigationData.find((el) => el.label === item.label);
    console.log(activeItem);
    if (activeItem.isActive) {
      activeItem.isActive = false;
    } else {
      activeItem.isActive = true;
    }
  };

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className={styles.header}>
      <p>Ave, Poopsique</p>
      <div>
        <img src={logo} alt="" />
        <ul className={styles.navigation}>
          {navigationData.map((el, index) => (
            <li
              key={index}
              // onMouseOver={() => setActiveIndex(index)}
              // onMouseLeave={() => setActiveIndex(index)}
              className={
                index === activeIndex
                  ? styles.navigation_item_active
                  : styles.navigation_item
              }
            >
              <Link key={index} to={el.link}>
                {el.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.time}>
        <Icon color={"#058DD9"} noBorder icon={<BsClock />} />{" "}
        <p>{currentTime}</p>
      </div>
    </div>
  );
};
