import { useState, useEffect, useCallback } from "react";
import Column from "../../../components/column";
import AddNewTimerModal from "../addNewTimerModal";
import RespownList from "../../../components/respownList";
import staticRaidBossData from "../../../static_data/raid_boss_interlude.json";
import {
  RAID_BOSS_DATA,
  RESPOWNED_DATA,
  clearAllCachedData,
  getHoursDiff,
  getItemWithRespownTime,
  move,
} from "../raidListHelpers";
import { BiAlarmAdd } from "react-icons/bi";
import Button from "../../../components/button";
import styles from "./RaidBossWaitingList.module.css";

const RaidBossWaitingList = ({
  onRespownStart,
  cachedDataWithTime,
  changeCachedDataWithTime,
}) => {
  const [modalOpen, changeModalOpen] = useState(false);

  const [currentRBwithTime, changeCurrentRBwithTime] = useState();
  const [raidBossList, changeRaidBossList] = useState();
  const [loading, changeLoading] = useState(false);

  useEffect(() => {
    if (cachedDataWithTime && cachedDataWithTime.length >= 0) {
      localStorage.setItem(RAID_BOSS_DATA, JSON.stringify(cachedDataWithTime));
    }
  }, [cachedDataWithTime]);

  useEffect(() => {
    const data = localStorage.getItem(RAID_BOSS_DATA);
    if (data) {
      changeCachedDataWithTime(JSON.parse(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRBList = () => {
    const respowningBosses = localStorage.getItem(RAID_BOSS_DATA);
    const respownedBosses = localStorage.getItem(RESPOWNED_DATA);

    return staticRaidBossData.filter(
      (el) =>
        !respowningBosses?.includes(el.name) &&
        !respownedBosses?.includes(el.name)
    );
  };

  const handleCloseModal = () => {
    changeModalOpen(!modalOpen);
    changeRaidBossList(filteredRBList);
  };

  // eslint-disable-next-line no-unused-vars
  const handleClearCachedData = () => {
    clearAllCachedData();
    changeCachedDataWithTime([]);
  };

  const handleChangeCurrentRaidBoss = (item) => {
    changeCurrentRBwithTime(item);
  };

  const addNewCachebleItem = (el, time) => {
    const newItemWithTime = getItemWithRespownTime(el, time);
    if (
      newItemWithTime &&
      cachedDataWithTime &&
      cachedDataWithTime.length > 0
    ) {
      const result = [...cachedDataWithTime, newItemWithTime];
      changeCachedDataWithTime(result);
    } else {
      changeCachedDataWithTime([newItemWithTime]);
    }
  };

  const removeRespowningBoss = (boss) => {
    changeCachedDataWithTime(
      cachedDataWithTime.filter((el) => el.name !== boss.name)
    );
  };

  useEffect(() => {
    if (cachedDataWithTime) {
      cachedDataWithTime?.map((el) => {
        const diff = getHoursDiff(el.time);
        if (diff === 0) {
          removeRespowningBoss(el);
          onRespownStart(el);
          move.play();
        }
        return null;
      });
    }
    setTimeout(() => changeLoading(!loading), 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      changeModalOpen(false);
      changeCurrentRBwithTime(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  return (
    <Column
      flex={1}
      headContent={
        <div className={styles.row}>
          <h2>Respown list</h2>
        </div>
      }
      bodyContent={
        <>
          <RespownList
            data={cachedDataWithTime}
            removeRespownedBoss={removeRespowningBoss}
          />
          <div className={styles.addNewButton}>
            <Button
              size="xl"
              onClick={() => changeModalOpen(true)}
              label="Add"
              icon={<BiAlarmAdd />}
            />
          </div>

          <AddNewTimerModal
            data={raidBossList}
            modalOpen={modalOpen}
            changeModalOpen={handleCloseModal}
            value={currentRBwithTime}
            onSuccess={addNewCachebleItem}
            onChangeActiveItem={handleChangeCurrentRaidBoss}
          />
        </>
      }
    />
  );
};

export default RaidBossWaitingList;
