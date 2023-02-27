import { useMemo, useCallback } from "react";
import Column from "../../components/column";
import Icon from "../../components/button";
import { MdDeleteForever } from "react-icons/md";
import { TbArrowBarToLeft, TbArrowBarToRight } from "react-icons/tb";
import {
  RAID_BOSS_DATA,
  getItemWithRespownTime,
  clearAllCachedData,
  currentTime,
  convertMsToTime,
  RESPOWNED_DATA,
  addDefaultTimeToItem,
} from "./raidListHelpers";
import { useEffect, useState } from "react";
import AddNewTimerModal from "./addNewTimerModal";
import RaidBossCard from "../../components/raidBossCard";
import ServerSettings from "../../components/spownDelay";
import RespownList from "../../components/respownList";
import staticRaidBossData from "./../../static_data/raid_boss_interlude.json";
import styles from "./RaidList.module.css";

// SOUNDS
let move = new Audio();
move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";

export const RaidList = () => {
  const [cachedDataWithTime, changeCachedDataWithTime] = useState(null);
  const [respownedBoss, changeRespownedBoss] = useState(null);
  const [currentRBwithTime, changeCurrentRBwithTime] = useState();
  const [loading, changeLoading] = useState(false);
  const [settingsOpen, changeSettingsOpen] = useState(true);
  const [modalOpen, changeModalOpen] = useState(false);

  const restOfRbList = useMemo(() => {
    return staticRaidBossData.filter(
      (rb) =>
        cachedDataWithTime &&
        !cachedDataWithTime.some((crb) => rb.name === crb.name) &&
        respownedBoss &&
        !respownedBoss.some((rdb) => rdb.name === rb.name)
    );
  }, [cachedDataWithTime, respownedBoss]);

  // DELETE ALL CACHED RESP DATA
  const handleClearCachedData = () => {
    clearAllCachedData();
    changeCachedDataWithTime([]);
  };

  const handleChangeCurrentRaidBoss = (item) => {
    changeCurrentRBwithTime(item);
  };

  // ADD NEW CACHED ITEM RESP DATA
  const addNewCachebleItem = (el, time) => {
    const newItemWithTime = getItemWithRespownTime(el, time);
    if (newItemWithTime) {
      changeCachedDataWithTime([...cachedDataWithTime, newItemWithTime]);
    }
  };

  useEffect(() => {
    // INITIALIZE CACHED DATA
    if (cachedDataWithTime) {
      localStorage.setItem(RAID_BOSS_DATA, JSON.stringify(cachedDataWithTime));
    }
  }, [cachedDataWithTime]);

  useEffect(() => {
    // INITIALIZE RESPOWNED DATA
    if (respownedBoss) {
      localStorage.setItem(RESPOWNED_DATA, JSON.stringify(respownedBoss));
    }
  }, [respownedBoss]);

  useEffect(() => {
    // REHYDRATE CACHED DATA
    const data = localStorage.getItem(RAID_BOSS_DATA);
    if (data) {
      changeCachedDataWithTime(JSON.parse(data));
    }
    // REHYDRATE RESPOWNED DATA
    const respowedData = localStorage.getItem(RESPOWNED_DATA);
    if (respowedData) {
      changeRespownedBoss(JSON.parse(respowedData));
    }
  }, []);

  // DELETE ONE ITEM FROM CACHED DATA
  const removeRespowningBoss = (boss) => {
    changeCachedDataWithTime(
      cachedDataWithTime.filter((el) => el.name !== boss.name)
    );
  };

  // DELETE ONE ITEM FROM RESPOWNED DATA
  const removeRespownedBoss = (boss) => {
    changeRespownedBoss(() =>
      respownedBoss.filter((el) => el.name !== boss.name)
    );
  };

  // RESET RESPOWNING EL TO CHECKED DATA
  const resetRespowningElement = (el) => {
    removeRespownedBoss(el);
    changeCachedDataWithTime([...cachedDataWithTime, addDefaultTimeToItem(el)]);
  };

  // COUNTER CHECK
  useEffect(() => {
    if (cachedDataWithTime) {
      cachedDataWithTime?.map((el) => {
        if (convertMsToTime(el.time) === currentTime()) {
          removeRespowningBoss(el);
          changeRespownedBoss([
            ...respownedBoss.filter((item) => item.name !== el.name),
            el,
          ]);
          move.play();
        }
        return null;
      });
    }
    setTimeout(() => changeLoading(!loading), 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const toggleModeSettings = () => {
    changeSettingsOpen(!settingsOpen);
  };

  const handleCloseModal = () => {
    changeModalOpen(!modalOpen);
  };

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
    <div className={styles.mainContainer}>
      <Column
        iconRight={
          <Icon
            color={"lightgrey"}
            icon={settingsOpen ? <TbArrowBarToLeft /> : <TbArrowBarToRight />}
            onClick={toggleModeSettings}
          />
        }
        isOpen={settingsOpen}
        headContent={<h2>Boss Respown Timers</h2>}
        bodyContent={<ServerSettings />}
      />
      <Column
        iconLeft={
          <Icon
            color={"red"}
            icon={<MdDeleteForever />}
            onClick={handleClearCachedData}
          />
        }
        iconRight={
          <AddNewTimerModal
            data={restOfRbList}
            modalOpen={modalOpen}
            changeModalOpen={handleCloseModal}
            value={currentRBwithTime}
            onSuccess={addNewCachebleItem}
            onChangeActiveItem={handleChangeCurrentRaidBoss}
          />
        }
        headContent={
          <div className={styles.row}>
            <h2>Respown list</h2>
          </div>
        }
        bodyContent={
          <RespownList
            data={cachedDataWithTime}
            removeRespownedBoss={removeRespowningBoss}
          />
        }
      />

      <Column
        headContent={<h2>Respown in any minute</h2>}
        bodyContent={
          <ul className={styles.raidList}>
            {respownedBoss &&
              respownedBoss.map((el, index) => {
                return (
                  <RaidBossCard
                    key={index}
                    withBackTimer={true}
                    value={el}
                    onSuccess={() => resetRespowningElement(el)}
                    onClose={() => removeRespownedBoss(el)}
                    onDeleteItem={removeRespownedBoss}
                  />
                );
              })}
          </ul>
        }
      />
    </div>
  );
};
