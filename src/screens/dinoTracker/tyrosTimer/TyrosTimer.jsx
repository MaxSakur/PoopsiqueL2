import React from "react";
import Tyros from "../tyros";

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "48px",
};

const TyrosTimer = ({ data, updateTyros }) => {
  return (
    <div style={container}>
      {data.map((el, i) => (
        <Tyros key={i} el={el} updateTyros={updateTyros} data={data} />
      ))}
    </div>
  );
};

export default TyrosTimer;
