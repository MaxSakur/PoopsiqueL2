import React, { useState, memo } from "react";
import styles from "./CraftItem.module.css";
import Select, { OptionsOrGroups } from "react-select";
import Icon from "../../../../components/icon";
import { RaidBoss } from "./../../../../types/craft.types";
import { HiOutlineX } from "react-icons/hi";
import static_data from "./../../../../static_data/equip_data.json";
import { RootState } from "../../../../redux";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash-es";
import { updateCraftItem } from "../../../../redux/reducers/craftSlice";

type CraftItemType = {
  // craftValue: RaidBoss | RaidBoss[];
  // onSelectChange: () => void;
  // countValue: number;
  // setCountValue: () => void;
  item: RaidBoss;
  index: number;
};
type SelectOptionType = { label: string; value: string };

const CraftItem: React.FC<CraftItemType> = ({
  // craftValue,
  // onSelectChange,
  // countValue,
  // setCountValue,
  item,
  index,
}) => {
  const [currentSelect, setCurrentSelect] = useState<RaidBoss>(item);
  const [currentCount, setcurrentCount] = useState<number>(1);
  const craft: RaidBoss[] = useSelector((state: RootState) => state.craft.data);
  const dispatch = useDispatch();

  const isSelectOption = (v: any): v is RaidBoss => {
    if ((v as RaidBoss).value !== undefined) return v;
    return false;
  };

  const handleUpdateCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = Number(e.target.value);
    const resultConditions = () => {
      if (result >= 100) {
        return 100;
      } else {
        return result;
      }
    };

    setcurrentCount(resultConditions);
    dispatch(
      updateCraftItem({ el: currentSelect, index, count: resultConditions() })
    );
  };

  const getSelectData = () => {
    return _.differenceBy(static_data, craft, "value");
  };

  const hangleUpdate = (e: RaidBoss) => {
    setCurrentSelect(e);
    dispatch(updateCraftItem({ el: e, index }));
  };

  return (
    <div className={styles.row}>
      <Select
        className={styles.select}
        value={currentSelect}
        options={getSelectData() as any}
        onChange={(v) => {
          if (isSelectOption(v)) {
            hangleUpdate(v);
          }
        }}
      />
      <Icon noBorder={true} icon={<HiOutlineX color="#fff" />} />
      <input
        type="number"
        max={100}
        value={currentCount}
        className={styles.count}
        onChange={handleUpdateCount}
      />
    </div>
  );
};

export default memo(CraftItem);
