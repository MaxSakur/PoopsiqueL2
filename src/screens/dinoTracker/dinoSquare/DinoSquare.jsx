import { useState } from "react";
import { generatePathByName } from "../../../images";
import DinoOverlay from "../dinoOverlay";
import styles from "./DinoSquare.module.css";

// PROVIDE HALF OF WIDTH OF PARENT CONTAINER
export const SQUARE_SIZE = 400;
export const DRAGGBLE_EL_SIZE = SQUARE_SIZE / 10;

const getHorizontalPosition = (index) => {
  return index <= 9
    ? `${DRAGGBLE_EL_SIZE}px`
    : `${Number(String(index)[1]) * DRAGGBLE_EL_SIZE}px`;
};
const getVerticalPosition = (index) => {
  return index <= 9
    ? `${DRAGGBLE_EL_SIZE}px`
    : `${Number(String(index)[0]) * DRAGGBLE_EL_SIZE}px`;
};

const DinoSquare = ({ data, updateTyros }) => {
  const [lastActiveElement, setActiveElement] = useState(0);
  const [reloaded, setReloaded] = useState(false);

  const handleDragEnd = (el) => {
    const currentTyrosIndex = data.findIndex((x) => x === el);

    let result = data;
    result[currentTyrosIndex] = {
      ...result[currentTyrosIndex],
      pos: lastActiveElement,
    };
    console.log(lastActiveElement);
    updateTyros(result);
    setReloaded(!reloaded);
  };

  // TODO: Limit click area to parent container
  return (
    <div
      className={styles.mapContainer}
      style={{ width: `${SQUARE_SIZE}px`, height: `${SQUARE_SIZE}px` }}
    >
      <DinoOverlay setActiveSlotOnDrop={setActiveElement} />
      {data?.map((el, index) => (
        <div
          className={styles.tyros}
          style={{
            width: `${SQUARE_SIZE / 10}px`,
            height: `${SQUARE_SIZE / 10}px`,
            left: `${getHorizontalPosition(el.pos)}`,
            top: `${getVerticalPosition(el.pos)}`,
          }}
          draggable={true}
          onDragEnd={() => handleDragEnd(el)}
          key={index}
        >
          <img src={`${generatePathByName("Dino")}`} alt="Tyronassaurus" />
          <p className={styles.label}>{index + 1}</p>
        </div>
      ))}
    </div>
  );
};

export default DinoSquare;
