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
  const [currentSelect, setCurrentSelect] = useState<RaidBoss | null>(null);
  const [currentInput, setCurrentInput] = useState<number>(1);
  const craft = useSelector((state: RootState) => state.craft.data);
  const dispatch = useDispatch();
  type SelectOption = {
    label: string;
    value: string;
  };

  const isSelectOption = (v: any): v is RaidBoss => {
    console.log(v);
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
    // setCountValue(resultConditions);
    setCurrentInput(resultConditions);
  };

  const getSelectData = () => {
    let normalizedData = craft.map((x: RaidBoss) => {
      let normalizedItem = () => {
        let arr: any = {};
        for (const [key, value] of Object.entries(x)) {
          if (key === "count") {
            return "";
          }
          arr[key as any] = value;
        }
        console.log("arr =--------------", arr);
        return arr;
      };
      console.log("normalizedItem", normalizedItem());

      // console.log("NOOONONONON", normalizedItem);
      return x;
    });

    console.log("normalizedData", normalizedData);

    return _.difference(static_data as RaidBoss[], normalizedData);
  };

  return (
    <div className={styles.row}>
      <Select
        className={styles.select}
        value={currentSelect}
        //
        options={getSelectData() as any}
        onChange={(v) => {
          if (isSelectOption(v)) {
            console.log(v);
            setCurrentSelect(v);
          }
        }}
      />
      <Icon noBorder={true} icon={<HiOutlineX color="#fff" />} />
      <input
        type="number"
        max={100}
        value={currentInput}
        className={styles.count}
        onChange={handleUpdateCount}
      />
    </div>
  );
};

export default memo(CraftItem);
