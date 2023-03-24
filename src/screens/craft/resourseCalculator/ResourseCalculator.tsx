import React, {
  memo,
  useState,
  useEffect,
  ReactElement,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { Resourse, RaidBoss } from "../../../types/craft.types";
// import styles from "./ResourseCalculator.module.css";

const ResourseCalculator = (): ReactElement => {
  const [resourseList, setResourseList] = useState<Resourse[] | []>([]);
  const craft: RaidBoss[] = useSelector((state: RootState) => state.craft.data);

  useEffect(() => {
    let resourses: Resourse[] = [];
    craft.map((craftItem) => {
      craftItem.ingridients.map((res) => {
        resourses.push({
          name: res.name,
          count: craftItem.count
            ? Number(res.count * craftItem?.count)
            : res.count,
        });
        return null;
      });

      console.log("resourseList", resourses);
      setResourseList(resourses);
      return null;
    });
  }, [craft]);

  useEffect(() => {
    console.log("resourseList", resourseList);
  }, [craft, resourseList]);

  return (
    <div>
      {
        <ul>
          {resourseList.map((item, index) => (
            <li key={index}>{`${item.name} ${item.count}`}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default memo(ResourseCalculator);
