import React, { memo, useMemo } from "react";
import styles from "./WeaponBlank.module.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const getLanguage = () => i18next.language;

const WeaponBlank = ({ el, enchantValue }) => {
  const currentLanguage = getLanguage();
  const { t } = useTranslation();

  const elPAtack = useMemo(() => {
    let result = null;
    if (enchantValue === 0) {
      result = 0;
    } else if (enchantValue <= 3) {
      result = enchantValue * 5;
    } else {
      result = (enchantValue - 3) * 10 + 15;
    }

    return el.PAtack + result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enchantValue]);

  const elMAtack = useMemo(() => {
    let result = null;
    if (enchantValue === 0) {
      result = 0;
    } else if (enchantValue <= 3) {
      result = enchantValue * 4;
    } else {
      result = (enchantValue - 3) * 8 + 12;
    }

    return el.MAtack + result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enchantValue]);

  const isTwoHanded = el.isTwoHanded
    ? t("weapon.twoHanded")
    : t("weapon.oneHanded");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_name}>
          <p className={styles.header_name_enchant}>{enchantValue}</p>
          <p className={styles.header_name_value}>{el.value}</p>
          <p className={styles.header_name_rarity}>{el.grade}</p>
        </div>
        <div className={styles.header_type}>
          <p>{currentLanguage === "ru" ? el.type.ru : el.type.en}</p>
          <p>/</p>
          <span>{isTwoHanded}</span>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.body_header}>
          {"<"}
          {t("weapon.spec")}
          {">"}
        </p>
        <ul>
          <li>
            {t("weapon.PAttack")}
            {" : "}
            {elPAtack}
          </li>
          <li>
            {t("weapon.MAttack")}
            {" : "}
            {elMAtack}
          </li>
          <li>
            {t("weapon.AtackSpeed.label")}
            {" : "}
            {/* eslint-disable-next-line no-useless-concat */}
            {t("weapon.AtackSpeed" + "." + `${el.speed}`)}
          </li>
          <li>
            {t("weapon.soulUsing")}
            {" : "}
            {"X 1"}
          </li>
          <li>
            {t("weapon.spiritUsing")}
            {" : "}
            {"X 1"}
          </li>
          <li>
            {t("weapon.weight")}
            {" : "}
            {"1180"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(WeaponBlank);
