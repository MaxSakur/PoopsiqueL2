import { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { RiPlayListAddFill } from "react-icons/ri";
import { BsCalculator } from "react-icons/bs";
import Button from "../../../components/button";
import { addCraftItem } from "../../../redux/reducers/craftSlice";
import CraftItem from "./craftItem";
import static_data from "../../../static_data/equip_data.json";
import { RootState } from "../../../redux";
import styles from "./CraftInitializer.module.css";

const CraftInitializer = () => {
  const craft = useSelector((state: RootState) => state.craft.data);
  const dispatch = useDispatch();
  const [inputsArrLength, setInputsArrLength] = useState(0);
  const { t } = useTranslation();

  const handleNewRow = () => {
    dispatch(addCraftItem({ el: static_data[inputsArrLength], count: 1 }));
    setInputsArrLength(inputsArrLength + 1);
  };

  return (
    <div className={styles.container}>
      {craft.map((el, index) => {
        return <CraftItem key={index} index={index} item={el} />;
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
