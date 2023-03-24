import { useEffect } from "react";
import Column from "../../../components/column";
import {
  RESPOWNED_DATA,
  addDefaultTimeToItem,
  generatePath,
} from "../raidListHelpers";
import RaidBossCard from "../../../components/raidBossCard";
import Button from "../../../components/button";
import { RiCloseFill, RiPlayListAddFill } from "react-icons/ri";
import { GiBattleGear, GiPathDistance } from "react-icons/gi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import styles from "./RaidBossRespowned.module.css";

const RaidBossRespowned = ({
  respownedBoss,
  changeRespownedBoss,
  cachedDataWithTime,
  changeCachedDataWithTime,
}) => {
  useEffect(() => {
    if (respownedBoss) {
      localStorage.setItem(RESPOWNED_DATA, JSON.stringify(respownedBoss));
    }
  }, [respownedBoss]);
  const { t } = useTranslation();
  useEffect(() => {
    const respowedData = localStorage.getItem(RESPOWNED_DATA);
    if (respowedData) {
      changeRespownedBoss(JSON.parse(respowedData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeRespownedBoss = (boss) => {
    changeRespownedBoss(() =>
      respownedBoss.filter((el) => el.name !== boss.name)
    );
  };

  const resetRespowningElement = (el) => {
    removeRespownedBoss(el);
    changeCachedDataWithTime([...cachedDataWithTime, addDefaultTimeToItem(el)]);
  };

  return (
    <Column
      flex={1}
      headContent={<h2>{t("almostRespownedList.name")}</h2>}
      bodyContent={
        <ul className={styles.raidList}>
          {respownedBoss?.length > 0 ? (
            respownedBoss.map((el, index) => {
              return (
                <RaidBossCard
                  key={index}
                  value={el}
                  withBackTimer={true}
                  onDeleteItem={removeRespownedBoss}
                  buttons={
                    <>
                      <Button
                        icon={<GiBattleGear />}
                        externalLink={el.drop}
                        label={t("buttons.drop")}
                      />
                      <Button
                        icon={<GiPathDistance />}
                        externalLink={generatePath(el.drop)}
                        label={t("buttons.path")}
                      />
                      <Button
                        icon={<RiCloseFill />}
                        label={t("buttons.delete")}
                        onClick={() => removeRespownedBoss(el)}
                      />
                      <Button
                        icon={<RiPlayListAddFill />}
                        label={t("buttons.reset")}
                        onClick={() => resetRespowningElement(el)}
                      />
                    </>
                  }
                />
              );
            })
          ) : (
            <div className={styles.hint_container}>
              <div className={styles.icon_container}>
                <Button size="xl" icon={<IoIosHelpCircleOutline />} />
              </div>
              <ul className={styles.hints}>
                {t("almostRespownedList.hints", { returnObjects: true }).map(
                  (el, index) => {
                    return (
                      <li key={index}>
                        <p className={styles.hint}>{`${index + 1}) ${el}`}</p>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          )}
        </ul>
      }
    />
  );
};

export default RaidBossRespowned;
