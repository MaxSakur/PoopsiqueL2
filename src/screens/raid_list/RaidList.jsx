import { useState } from "react";
import RaidBossSettings from "./raidBossSettings";
import RaidBossWaitingList from "./raidBossWaitingList";
import RaidBossRespowned from "./raidBossRespowned";
import ScreenContainer from "../../components/screenContainer";

export const RaidList = () => {
  const [respownedBoss, changeRespownedBoss] = useState(null);
  const [cachedDataWithTime, changeCachedDataWithTime] = useState(null);

  const handleAddNewRespowned = (el) => {
    if (respownedBoss && respownedBoss.length > 0) {
      changeRespownedBoss([...respownedBoss, el]);
    } else {
      changeRespownedBoss([el]);
    }
  };

  return (
    <ScreenContainer>
      <RaidBossSettings />
      <RaidBossWaitingList
        onRespownStart={handleAddNewRespowned}
        cachedDataWithTime={cachedDataWithTime}
        changeCachedDataWithTime={changeCachedDataWithTime}
      />
      <RaidBossRespowned
        respownedBoss={respownedBoss}
        changeRespownedBoss={changeRespownedBoss}
        cachedDataWithTime={cachedDataWithTime}
        changeCachedDataWithTime={changeCachedDataWithTime}
      />
    </ScreenContainer>
  );
};
