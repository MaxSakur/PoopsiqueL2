import moment from "moment";
import staticRaidBossData from "./../../static_data/raid_boss_interlude.json";

export const RAID_BOSS_DATA = "raid_boss_data";

export const findBossByName = ({ name }) => {
  return staticRaidBossData.filter((boss) => boss.name === name);
};
export const generateNextRespTime = (el) => {
  const { time, respTime } = el;
  return moment(time, "x").add(respTime, "hours").format("HH:mm");
};

export const calculateBossNextRespown = (time) => {
  const currentDateTime = moment();
  const res = moment(time, "HH:mm");
  const nextRespownTime =
    res.diff(currentDateTime, "m") < 0
      ? moment(time, "HH:mm").add(-1, "days").format("x")
      : moment(time, "HH:mm").format("x");
  return nextRespownTime;
};

// WORKING
export const getItemWithRespownTime = (el, nextRespownTime) => {
  if (moment(nextRespownTime, "HH:mm").isValid()) {
    const currentBoss = findBossByName(el);
    const currentBossWithTime = {
      ...currentBoss[0],
      time: calculateBossNextRespown(nextRespownTime),
    };
    return currentBossWithTime;
  }
};

export const restOfTime = ({ time, respTime }) => {
  return moment(time, "x").add(respTime, "hours").toNow();
};

export const clearAllCachedData = () => localStorage.removeItem(RAID_BOSS_DATA);
