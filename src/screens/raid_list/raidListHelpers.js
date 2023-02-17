import moment from "moment";
import staticRaidBossData from "./../../static_data/raid_boss_interlude.json";

export const RAID_BOSS_SPOWN_DELAY = "raid_boss_spown_delay";
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
  const respowns = JSON.parse(localStorage.getItem(RAID_BOSS_SPOWN_DELAY));
  const addDefaultRespown = moment(nextResp, DEFAULT_TIME_FORMAT).add(
    respowns[boss.type],
    "hours"
  );
  return nextResp && addDefaultRespown.format("x");
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

export const getMaxRespTime = (el, timeCount = "seconds") => {
  const respowns = JSON.parse(localStorage.getItem(RAID_BOSS_SPOWN_DELAY));
  const { time } = el;
  const maxResp = moment(time, "x").add(respowns["random"], "hours");
  return maxResp.diff(moment(), timeCount);
};

export const toTimeString = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(
    hours !== 0 ? seconds / hours : Math.floor(seconds / 60)
  );

  if (hours === 0) {
    return `00:${minutes}`;
  }

  return `${hours}: ${((seconds - hours * 3600) / 60).toFixed(0)}`;
};

export const generatePath = (str) => str.replace("npc", "loc");

export const clearAllCachedData = () => localStorage.removeItem(RAID_BOSS_DATA);
