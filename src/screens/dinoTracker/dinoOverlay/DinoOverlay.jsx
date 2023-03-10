import React from "react";
import styles from "./DinoOverlay.module.css";
import { DRAGGBLE_EL_SIZE, SQUARE_SIZE } from "../dinoSquare/DinoSquare";

const DinoOverlay = ({ setActiveSlotOnDrop }) => {
  const rowItems = Number(SQUARE_SIZE / DRAGGBLE_EL_SIZE);
  const getFieldsCount = () => {
    const data = new Array(rowItems * rowItems).fill({});
    return data;
  };
  const handleSetActive = (event, i) => {
    setActiveSlotOnDrop(i);
    event.target.style.cursor = "none";
    event.target.style.border = "2px solid blue";
  };
  const handleSetDisabled = (event) => {
    event.target.style.border = "1px solid lightgrey";
  };

  return (
    <ul
      className={styles.overlay}
      style={{
        gridTemplateColumns: `repeat(${rowItems}, ${DRAGGBLE_EL_SIZE}px)`,
        gridAutoRows: `${DRAGGBLE_EL_SIZE}px`,
      }}
    >
      {getFieldsCount().map((_, i) => (
        <li
          key={i}
          onDragLeave={(event) => handleSetDisabled(event)}
          onDragOver={(event) => handleSetActive(event, i)}
        />
      ))}
    </ul>
  );
};

export default DinoOverlay;
