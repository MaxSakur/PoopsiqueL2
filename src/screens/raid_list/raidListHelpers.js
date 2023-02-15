import moment from "moment";
import staticRaidBossData from "./../../static_data/raid_boss_interlude.json";

export const RAID_BOSS_DATA = "raid_boss_data";
export const RESPOWNED_DATA = "respowned_data";
export const DEFAULT_TIME_FORMAT = "HH:mm";
export const EXTENDED_TIME_FORMAT = "DD.MM.YY HH:mm";

export const findBossByName = ({ name }) => {
  return staticRaidBossData.filter((boss) => boss.name === name);
};

export const currentTime = () => {
  return moment().format(EXTENDED_TIME_FORMAT);
};

export const convertMsToTime = (ms) =>
  moment(ms, "x").format(EXTENDED_TIME_FORMAT);

export const convertNextRespToMs = (boss, nextResp) => {
  const { respTime } = boss;
  const now = moment();
  const next = moment(nextResp, DEFAULT_TIME_FORMAT);

  const addDefaultRespown = moment(nextResp, DEFAULT_TIME_FORMAT).add(
    respTime,
    "hours"
  );

  const checkPreviousDate = () => {
    if (next.diff(now, "hours", true) > 0) {
      return addDefaultRespown.add(-1, "days").format("x");
    }
    return addDefaultRespown.format("x");
  };

  return nextResp && checkPreviousDate();
};

export const restOfTime = ({ time }) => {
  return moment(time, "x").fromNow();
};

export const getRespownTime = (boss) => {
  const { time } = boss;
  const res = moment(time, "x").format(EXTENDED_TIME_FORMAT);
  return res;
};

// WORKING
export const getItemWithRespownTime = (el, nextRespownTime) => {
  if (moment(nextRespownTime, DEFAULT_TIME_FORMAT).isValid()) {
    const currentBoss = findBossByName(el);
    const currentBossWithTime = {
      ...currentBoss[0],
      time: convertNextRespToMs(el, nextRespownTime),
    };

    return currentBossWithTime;
  }
};

export const clearAllCachedData = () => localStorage.removeItem(RAID_BOSS_DATA);
