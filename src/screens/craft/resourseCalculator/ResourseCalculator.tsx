import React, { memo, useState, useEffect, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { RaidBoss } from "../../../types/craft.types";
// import styles from "./ResourseCalculator.module.css";

type ResourseCalculatorType = {
  data: RaidBoss[];
};

const ResourseCalculator = ({ data }: ResourseCalculatorType): ReactElement => {
  const [resourseList, setResourseList] = useState<RaidBoss[]>([]);
  const craft = useSelector((state: RootState) => state.craft.data);

  useEffect(() => {
    setResourseList(data);
  }, [data]);

  useEffect(() => {
    console.log(craft, "craft");
    setResourseList(craft);
  }, [craft]);

  return (
    <div>
      <ul>{resourseList.map(({ value }) => value)}</ul>
    </div>
  );
};

export default memo(ResourseCalculator);
