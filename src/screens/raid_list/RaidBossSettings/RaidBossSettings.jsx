import React, { useState } from "react";
import Column from "../../../components/column";
import Icon from "../../../components/icon";
import { TbArrowBarToLeft, TbArrowBarToRight } from "react-icons/tb";
import ServerSettings from "../../../components/spownDelay";

const RaidBossSettings = () => {
  const [settingsOpen, changeSettingsOpen] = useState(true);
  const toggleModeSettings = () => {
    changeSettingsOpen(!settingsOpen);
  };

  return (
    <Column
      iconRight={
        <Icon
          color={"lightgrey"}
          icon={settingsOpen ? <TbArrowBarToLeft /> : <TbArrowBarToRight />}
          onClick={toggleModeSettings}
        />
      }
      isOpen={settingsOpen}
      headContent={<h2>Boss Respown Timers</h2>}
      bodyContent={<ServerSettings />}
    />
  );
};

export default RaidBossSettings;
