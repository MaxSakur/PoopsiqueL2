import moment from "moment";
import staticRaidBossData from "./../../static_data/raid_boss_interlude.json";

export const RAID_BOSS_SPOWN_DELAY = "raid_boss_spown_delay";
export const RAID_BOSS_DATA = "raid_boss_data";
export const RESPOWNED_DATA = "respowned_data";
export const DEFAULT_TIME_FORMAT = "HH:mm";
export const EXTENDED_TIME_FORMAT = "DD.MM.YY HH:mm";

export let move = new Audio();
move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";

export const findBossByName = ({ name }) => {
  return staticRaidBossData.filter((boss) => boss.name === name);
};

export const currentTime = () => {
  return moment().format(EXTENDED_TIME_FORMAT);
};

export const convertMsToTime = (ms) =>
  moment(ms, "x").format(EXTENDED_TIME_FORMAT);

let additionalRespownHours = (boss) => {
  const respowns = JSON.parse(localStorage.getItem(RAID_BOSS_SPOWN_DELAY));
  switch (boss.type) {
    case "all":
      return respowns.all_bosses_timer;
    case "alliance":
      return respowns.alliance_bosses_timer;
    case "nobless":
      return respowns.nobless_timer;
    default:
      break;
  }
};

export const convertNextRespToMs = (boss, lastKillTime) => {
  const now = moment();
  const lastKill = moment(lastKillTime, DEFAULT_TIME_FORMAT);
  let result = "";
  if (now.diff(lastKill) > 0) {
    result = moment(lastKillTime, DEFAULT_TIME_FORMAT).add(
      additionalRespownHours(boss),
      "hours"
    );
  } else {
    result = moment(lastKillTime, DEFAULT_TIME_FORMAT)
      .add(-1, "days")
      .add(additionalRespownHours(boss), "hours");
  }
  return result.format("x");
};

export const restOfTime = ({ time }) => {
  return moment(time, "x").fromNow();
};

export const getRespownTime = (boss) => {
  const { time } = boss;
  const res = moment(time, "x").format(EXTENDED_TIME_FORMAT);
  return res;
};

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

export const addDefaultTimeToItem = (el) => {
  return {
    ...el,
    time: moment(el.time, "x")
      .add(additionalRespownHours(el), "hours")
      .format("x"),
  };
};

export const getMaxRespTime = (el, timeCount = "seconds") => {
  const respowns = JSON.parse(localStorage.getItem(RAID_BOSS_SPOWN_DELAY));
  const { time } = el;
  let additionalRespownHours = () => {
    switch (el.type) {
      case "all":
        return respowns.all_bosses_random;
      case "alliance":
        return respowns.alliance_bosses_random;
      case "nobless":
        return respowns.nobless_random;
      default:
        break;
    }
  };
  const maxSeconds = moment(time, "x").add(additionalRespownHours(), "hours");

  const diff = maxSeconds.diff(moment(), timeCount);
  return {
    diff,
    maxSeconds,
  };
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
export const getHoursDiff = (time) => {
  return moment(time, "x").diff(
    moment(currentTime(), EXTENDED_TIME_FORMAT),
    "hours"
  );
};
export const clearAllCachedData = () => localStorage.removeItem(RAID_BOSS_DATA);
