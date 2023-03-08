import Select from "react-select";
import { useMemo, useState } from "react";
import styles from "./AddNewTimerModal.module.css";
import RaidBossCard from "../../../components/raidBossCard";
import staticRaidBossData from "./../../../static_data/raid_boss_interlude.json";
import Button from "../../../components/button";
import { RiCloseFill, RiPlayListAddFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      {modalOpen && (
        <div className={styles.modal_container}>
          <div className={styles.overlay} />
          <div className={styles.modal}>
            <Select
              options={convertedDataForSelect}
              styles={colourStyles}
              onChange={(el) => onChangeActiveItem(el)}
            />

            {value && (
              <RaidBossCard
                value={value}
                content={
                  <>
                    <p className={styles.lastKillLabel}>
                      {t("respownList.lastKillTime")}
                    </p>
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
                  </>
                }
                buttons={
                  <>
                    <Button
                      icon={<RiCloseFill />}
                      label={t("buttons.close")}
                      onClick={handleClearCurrentAndCloseModal}
                    />
                    <Button
                      disabled={!respawnTimer.length > 0}
                      icon={<RiPlayListAddFill />}
                      label={t("buttons.add")}
                      onClick={handleAddListenedItem}
                    />
                  </>
                }
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewTimerModal;
