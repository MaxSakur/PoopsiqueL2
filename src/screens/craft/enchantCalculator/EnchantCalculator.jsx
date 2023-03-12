import React, { useState } from "react";
import Select from "react-select";
import data from "./../../../static_data/equip_data.json";

const chances = [
  { value: 100 },
  { value: 100 },
  { value: 100 },
  { value: 70 },
  { value: 49 },
  { value: 34.3 },
  { value: 24.01 },
  { value: 16.8 },
  { value: 11.76 },
  { value: 8.23 },
  { value: 5.76 },
  { value: 4.03 },
  { value: 2.82 },
  { value: 1.97 },
];

const selectFont = {
  fontSize: 14,
  textAlign: "left",
};

const colourStyles = {
  control: (styles) => ({
    ...styles,
    ...selectFont,
  }),
  option: (styles) => {
    return {
      ...styles,
      ...selectFont,
      fontWeight: "400",
    };
  },
};

const EnchantCalculator = () => {
  const [currentItem, setCurrentItem] = useState(null);

  console.log(data, Array.from(data));

  return (
    <div>
      <img src="" />
      <Select
        options={Array.from(data)}
        styles={colourStyles}
        onChange={(el) => setCurrentItem(el)}
      />
      {currentItem}
    </div>
  );
};

export default EnchantCalculator;
