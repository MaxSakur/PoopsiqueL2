import { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { RiPlayListAddFill } from "react-icons/ri";
import { BsCalculator } from "react-icons/bs";
import Button from "../../../components/button";
import craftSlice, { addCraftItem } from "./../../../redux/reducers/craftSlice";
import CraftItem from "./craftItem";
import static_data from "./../../../static_data/equip_data.json";
import _ from "lodash";

import styles from "./CraftInitializer.module.css";

const CraftInitializer = () => {
  const craft = useSelector((state) => state.craft.data);
  const dispatch = useDispatch();
  const [craftDataArr, setCraftArrData] = useState([]);
  const [inputsArrLength, setInputsArrLength] = useState(0);
  const { t } = useTranslation();

  const handleNewRow = () => {
    dispatch(addCraftItem({ el: static_data[inputsArrLength], count: 1 }));
    setInputsArrLength(inputsArrLength + 1);
  };

  // const handleOnSelectChange = (el, index, count = 1) => {
  //   dispatch(updateCraftList({ el, index }));
  // };

  const handleSetNewCount = (value, index) => {
    const filteredData = () => {
      let result = craftDataArr;
      result[index]["count"] = Number(value);
      return result;
    };
    // dispatch(createCraftEl(craftDataArr, value));
    setCraftArrData(filteredData());
  };

  const getSelectData = _.difference(static_data, craftDataArr);

  return (
    <div className={styles.container}>
      {craftDataArr.map((_, index) => {
        return (
          <CraftItem
            key={index}
            selectData={getSelectData}
            craftValue={craftDataArr[index]}
            // onSelectChange={(el) => handleOnSelectChange(el, index)}
            countValue={craftDataArr.length > 0 && craftDataArr[index].count}
            setCountValue={(el) => handleSetNewCount(el, index)}
          />
        );
      })}

      <div className={styles.plus_container}>
        <Button
          icon={<RiPlayListAddFill />}
          label={t("buttons.add")}
          onClick={handleNewRow}
        />
        <Button
          icon={<BsCalculator />}
          label={t("buttons.calculate")}
          onClick={() => console.log(craft)}
        />
      </div>
    </div>
  );
};

export default memo(CraftInitializer);
