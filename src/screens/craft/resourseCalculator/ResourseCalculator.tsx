import React, { memo, useState, useEffect, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
// import styles from "./ResourseCalculator.module.css";

type ResourseCalculatorType = {
  data: RaidBoss[];
};

enum Grade {
  D = "D",
  C = "D",
  B = "B",
  A = "A",
  S = "S",
}

type RaidBoss = {
  value: string;
  label: string;
  type: Object;
  isTwoHanded: boolean;
  speed: string;
  grade: Grade;
  PAtack: number;
  MAtack: number;
};

const ResourseCalculator = ({ data }: ResourseCalculatorType): ReactElement => {
  const [resourseList, setResourseList] = useState<RaidBoss[]>([]);
  const craft = useSelector((state: RootState) => state.craft.data);

  useEffect(() => {
    setResourseList(data);
  }, [data]);

  useEffect(() => {
    console.log(craft, "craft");
  }, [craft]);

  return (
    <div>
      <ul>{resourseList.map(({ value }) => value)}</ul>
    </div>
  );
};

export default memo(ResourseCalculator);
