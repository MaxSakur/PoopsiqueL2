import moment from "moment";
import Select from "react-select";
import { useMemo, useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { generatePathByName } from "../../../images";
import styles from "./AddNewTimerModal.module.css";
import { RAID_BOSS_DATA } from "../RaidList";

const selectFont = {
  fontSize: 14,
  textAlign: "left",
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

const AddNewTimerModal = ({
  data,
  value,
  onChangeData,
  onChangeActiveItem,
}) => {
  const [modalOpen, changeModalOpen] = useState(false);
  const [respawnTimer, changeRespawnTimer] = useState(data);

  const toggleModal = () => {
    changeModalOpen(!modalOpen);
    // onChangeActiveItem(null);
  };

  const updateListWithTime = (el) => {
    if (moment(respawnTimer, "HH:mm").isValid()) {
      const currentBoss = data.filter((boss) => boss.name === el.value);

      const currentBossWithTime = {
        ...currentBoss[0],
        time: moment(respawnTimer, "HH:mm").format("x"),
      };

      const cachedRaidBossData =
        localStorage.getItem(RAID_BOSS_DATA) &&
        JSON.parse(localStorage.getItem(RAID_BOSS_DATA));

      const previousData = () => {
        if (cachedRaidBossData === null) {
          return [currentBossWithTime];
        } else if (cachedRaidBossData.length > 0) {
          return [
            ...cachedRaidBossData.filter((el) => el.name !== currentBoss.name),
            currentBossWithTime,
          ];
        }
      };
      localStorage.setItem(RAID_BOSS_DATA, JSON.stringify(previousData()));
    }
  };

  const handleAddListenedItem = () => {
    updateListWithTime(value);
    toggleModal();
    onChangeActiveItem(null);
  };

  const handleClearTime = () => {
    toggleModal();
  };

  const rbData = useMemo(() => {
    let updatedForSelectData = [];
    data.map((el) =>
      updatedForSelectData.push({
        value: el.name,
        label: el.name,
        lvl: el.lvl,
        location: el.location,
        respTime: el.respTime,
      })
    );
    return updatedForSelectData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      toggleModal(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <>
      <button onClick={toggleModal}>
        <FaPlus />
      </button>
      {modalOpen && (
        <div className={styles.modal_container}>
          <div className={styles.overlay} />
          <div className={styles.modal}>
            <Select
              options={rbData}
              styles={colourStyles}
              onChange={(el) => onChangeActiveItem(el)}
              // onChange={(el) => changevalue(el)}
            />
            {value && (
              <div className={styles.activeContainer}>
                <img
                  className={styles.image}
                  src={generatePathByName(value.value)}
                  alt={`${value.value} portrait`}
                />
                <div className={styles.valueInfoContainer}>
                  <div>
                    <p className={styles.name}>
                      {value.label}, {value.lvl} lvl
                    </p>
                    <p className={styles.location}>{value.location}</p>
                  </div>

                  <input
                    type="time"
                    className={styles.timeInput}
                    value={respawnTimer}
                    onChange={(event) => {
                      changeRespawnTimer(event.target.value);
                    }}
                    onBlur={() => {
                      updateListWithTime(value);
                      changeRespawnTimer("");
                    }}
                  />

                  <div className={styles.buttons}>
                    <button onClick={handleClearTime}>Close</button>
                    <button onClick={handleAddListenedItem}>Add</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewTimerModal;
