import Select from "react-select";
import { useMemo, useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./AddNewTimerModal.module.css";
import RaidBossCard from "../../../components/raidBossCard";
import Icon from "../../../components/button";
import staticRaidBossData from "./../../../static_data/raid_boss_interlude.json";

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
  data = staticRaidBossData,
  value,
  onSuccess,
  onChangeActiveItem,
}) => {
  const [modalOpen, changeModalOpen] = useState(false);
  const [respawnTimer, changeRespawnTimer] = useState("");

  const toggleModal = () => {
    changeModalOpen(!modalOpen);
  };

  const handleAddListenedItem = () => {
    onSuccess(value, respawnTimer);
    toggleModal();
    onChangeActiveItem(null);
    changeRespawnTimer("");
  };

  const handleClearTime = () => {
    toggleModal();
    onChangeActiveItem(null);
  };

  const convertedDataForSelect = useMemo(() => {
    let updatedForSelectData = [];
    data.map((el) =>
      updatedForSelectData.push({
        ...el,
        value: el.name,
        label: el.name,
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
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  return (
    <>
      <Icon icon={<FaPlus />} onClick={toggleModal} />
      {modalOpen && (
        <div className={styles.modal_container}>
          <div className={styles.overlay} />
          <div className={styles.modal}>
            <Select
              options={convertedDataForSelect}
              styles={colourStyles}
              onChange={(el) => onChangeActiveItem(el)}
              // onChange={(el) => changevalue(el)}
            />

            {value && (
              <RaidBossCard
                value={value}
                content={
                  <input
                    type="time"
                    className={styles.timeInput}
                    value={respawnTimer}
                    onChange={(event) => {
                      changeRespawnTimer(event.target.value);
                    }}
                    onBlur={(event) => {
                      onSuccess();
                      changeRespawnTimer(event.target.value);
                    }}
                  />
                }
                onSuccess={handleAddListenedItem}
                onReject={handleClearTime}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewTimerModal;
