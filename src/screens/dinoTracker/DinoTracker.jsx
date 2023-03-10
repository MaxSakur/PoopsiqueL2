import { useState } from "react";
import moment from "moment";
import { DEFAULT_TIME_FORMAT } from "../raid_list/raidListHelpers";
import { generatePathByName } from "../../images";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./DinoTracker.module.css";
import DinoSquare from "./dinoSquare";

const Tyros = ({ el, index }) => {
  return (
    <div className={styles.tyros}>
      <div
        className={styles.tyros_index}
        style={{ backgroundImage: `url(${generatePathByName("Dino")})` }}
      >
        <p>{index + 1}</p>
      </div>
      <div className={styles.timer}>
        {moment(el.time, DEFAULT_TIME_FORMAT).isValid() ? (
          <p>{moment(el.time, DEFAULT_TIME_FORMAT).toNow(true)}</p>
        ) : (
          <p>`ALT + ${index + 1}`</p>
        )}
      </div>
    </div>
  );
};

let defaultTyrosData = [
  { id: 0, pos: 35, cd: 0 },
  { id: 1, pos: 39, cd: 0 },
  { id: 2, pos: 58, cd: 0 },
  { id: 3, pos: 66, cd: 0 },
  { id: 4, pos: 47, cd: 0 },
];

const DinoTracker = () => {
  const [tyros, updateTyros] = useState(defaultTyrosData);

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <DinoSquare data={tyros} updateTyros={updateTyros} />
      </DndProvider>
      {tyros.map((el, index) => (
        <Tyros key={index} el={el} index={index} />
      ))}
    </div>
  );
};

export default DinoTracker;
