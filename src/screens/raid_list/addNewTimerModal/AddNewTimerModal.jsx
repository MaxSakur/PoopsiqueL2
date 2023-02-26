import Select from "react-select";
import { useMemo, useState } from "react";
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
  modalOpen,
  changeModalOpen,
  onChangeActiveItem,
}) => {
  const [respawnTimer, changeRespawnTimer] = useState("");

  const toggleModal = () => {
    changeModalOpen();
  };

  const handleAddListenedItem = () => {
    onSuccess(value, respawnTimer);
    changeModalOpen();
    onChangeActiveItem(null);
    changeRespawnTimer("");
  };

  const handleClearCurrentAndCloseModal = () => {
    changeModalOpen();
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

  return (
    <>
      <Icon color={"green"} icon={<FaPlus />} onClick={toggleModal} />
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
                      changeRespawnTimer(event.target.value);
                    }}
                  />
                }
                onSuccess={handleAddListenedItem}
                onClose={handleClearCurrentAndCloseModal}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewTimerModal;
