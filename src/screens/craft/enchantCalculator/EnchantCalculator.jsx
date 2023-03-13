import React, { useState, memo } from "react";
import Select from "react-select";
import data from "./../../../static_data/equip_data.json";
import styles from "./EnchantCalculator.module.css";
import { generateWeaponsPathByName } from "../../../assets/images/s_weapons";
import WeaponBlank from "./weaponBlank";

const selectFont = {
  fontSize: 14,
  textAlign: "left",
  fontWeight: "500",
};

const colourStyles = {
  control: (styles) => ({
    ...styles,
    ...selectFont,
  }),
  option: (styles) => {
    return {
      ...styles,
      ...selectFont,
      fontWeight: "400",
    };
  },
};

const EnchantCalculator = () => {
  const [currentItem, setCurrentItem] = useState(data[0]);
  const [enchantValue, setEnchantValue] = useState(0);

  const handleChange = (el) => {
    setCurrentItem(el);
    setEnchantValue(0);
  };

  const handleMaxLength = (e) => {
    if (e.target.value <= 20) {
      setEnchantValue(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_line}>
          <div
            className={styles.header_line_image}
            style={{
              backgroundImage: `url("${generateWeaponsPathByName(
                currentItem.value
              )}")`,
            }}
            alt={currentItem.value}
          />
          <Select
            className={styles.header_line_select}
            value={currentItem}
            options={Array.from(data)}
            styles={colourStyles}
            onChange={handleChange}
          />
          <div
            className={styles.header_line_image}
            style={{
              backgroundImage: `url("${generateWeaponsPathByName(
                "ScrollEnchantWeaponS"
              )}")`,
            }}
            alt="ScrollEnchantWeaponS"
          />
          <input
            className={styles.header_line_input}
            type="number"
            value={enchantValue}
            onChange={handleMaxLength}
          />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.body_card}>
          <WeaponBlank el={currentItem} enchantValue={enchantValue} />
        </div>
      </div>
    </div>
  );
};

export default memo(EnchantCalculator);
