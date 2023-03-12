import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DinoSquare from "./dinoSquare";
import ScreenContainer from "../../components/screenContainer";
import TyrosTimer from "./tyrosTimer";

let defaultTyrosData = [
  { id: 0, pos: 35, cd: null },
  { id: 1, pos: 39, cd: null },
  { id: 2, pos: 58, cd: null },
  { id: 3, pos: 66, cd: null },
  { id: 4, pos: 47, cd: null },
];

const DinoTracker = () => {
  const [tyros, updateTyros] = useState(defaultTyrosData);

  return (
    <ScreenContainer>
      <DndProvider backend={HTML5Backend}>
        <DinoSquare data={tyros} updateTyros={updateTyros} />
      </DndProvider>
      <TyrosTimer data={tyros} updateTyros={updateTyros} />
    </ScreenContainer>
  );
};

export default DinoTracker;
