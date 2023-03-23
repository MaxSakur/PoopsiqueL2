import React, { useState } from "react";
import styles from "./CraftItem.module.css";
import Select from "react-select";
import Icon from "../../../../components/icon";
import { HiOutlineX } from "react-icons/hi";

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

const CraftItem = ({
  craftValue,
  onSelectChange,
  countValue,
  setCountValue,
  selectData,
}) => {
  const [currentSelect, setCurrentSelect] = useState(craftValue);
  const [currentInput, setCurrentInput] = useState(countValue);

  const updateNewSelectValue = (el) => {
    onSelectChange(el);
    setCurrentSelect(el);
  };

  const handleUpdateCount = (el) => {
    const result = el.target.value;
    setCountValue(result > 100 ? 100 : result);
    setCurrentInput(result > 100 ? 100 : result);
  };

  const normalizeCount = (e) => {
    e.target.value = e.target.value > 100 ? 100 : e.target.value;
  };

  return (
    <div className={styles.row}>
      <Select
        className={styles.select}
        value={currentSelect}
        options={selectData}
        styles={colourStyles}
        onChange={updateNewSelectValue}
      />
      <Icon noBorder={true} icon={<HiOutlineX color="#fff" />} />
      <input
        type="number"
        max={100}
        value={currentInput}
        disabled={!craftValue}
        className={styles.count}
        onChange={handleUpdateCount}
        onBlur={normalizeCount}
      />
    </div>
  );
};

export default CraftItem;
