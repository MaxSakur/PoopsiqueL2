import { useEffect } from "react";
import Column from "../../../components/column";
import styles from "./RaidBossRespowned.module.css";
import {
  RESPOWNED_DATA,
  addDefaultTimeToItem,
  generatePath,
} from "../raidListHelpers";
import RaidBossCard from "../../../components/raidBossCard";
import Button from "../../../components/button";
import { RiCloseFill, RiPlayListAddFill } from "react-icons/ri";
import { GiBattleGear, GiPathDistance } from "react-icons/gi";

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
      headContent={<h2>Respown in any minute</h2>}
      bodyContent={
        <ul className={styles.raidList}>
          {respownedBoss.length > 0 ? (
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
                        label="Drop"
                      />
                      <Button
                        icon={<GiPathDistance />}
                        externalLink={generatePath(el.drop)}
                        label="Path"
                      />
                      <Button
                        icon={<RiCloseFill />}
                        label="Close"
                        onClick={() => removeRespownedBoss(el)}
                      />
                      <Button
                        icon={<RiPlayListAddFill />}
                        label="Reset"
                        onClick={() => resetRespowningElement(el)}
                      />
                    </>
                  }
                />
              );
            })
          ) : (
            <p style={{ color: "#fff" }}>
              In this column you can see the list of raid bosses,
              <br /> which can be spawned in any minute.
              <br /> Elements adding automatically.
            </p>
          )}
        </ul>
      }
    />
  );
};

export default RaidBossRespowned;
