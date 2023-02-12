import moment from "moment";
import { RAID_BOSS_DATA } from "./RaidList";
import staticRaidBossData from "./../../static_data/raid_boss_interlude.json";

export const updateCachedRaidBossList = (el, nextRespownTime) => {
  if (moment(nextRespownTime, "HH:mm").isValid()) {
    const currentBoss = staticRaidBossData.filter(
      (boss) => boss.name === el.name
    );

    const currentBossWithTime = {
      ...currentBoss[0],
      time: moment(nextRespownTime, "HH:mm").format("x"),
    };

    const cachedRaidBossData =
      localStorage.getItem(RAID_BOSS_DATA) &&
      JSON.parse(localStorage.getItem(RAID_BOSS_DATA));

    const previousData = () => {
      if (cachedRaidBossData === null) {
        return [currentBossWithTime];
      } else if (cachedRaidBossData.length > 0) {
        return [
          ...cachedRaidBossData.filter((el) => el.name !== currentBoss.name),
          currentBossWithTime,
        ];
      }
    };
    localStorage.setItem(RAID_BOSS_DATA, JSON.stringify(previousData()));
  }
};

export const clearCachedData = () => localStorage.removeItem(RAID_BOSS_DATA);
