import React, { useMemo, useState } from "react";

const Dino = () => {
  const [keysPressed, updateKeyPressed] = useState({});

  useMemo(() => {
    document.addEventListener("keydown", (event) => {
      // keysPressed["Control"] = true;

      if (keysPressed["Control"] && event.key === "a") {
        alert(event.key);
      }
      // console.log(keysPressed);
    });

    document.addEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });
  }, [keysPressed]);

  return <div>Dino</div>;
};

export default Dino;
