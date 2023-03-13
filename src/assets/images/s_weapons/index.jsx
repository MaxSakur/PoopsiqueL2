import AngelSlayer from "./Angel Slayer.png";
import ArcanaMace from "./Arcana Mace.png";
import BasaltBattlehammer from "./Basalt Battlehammer.png";
import DemonSplinter from "./Demon Splinter.png";
import DraconicBow from "./Draconic Bow.png";
import DragonHunterAxe from "./Dragon Hunter Axe.png";
import ForgottenBlade from "./Forgotten Blade.png";
import HeavensDivider from "./Heavens Divider.png";
import ImperialStaff from "./Imperial Staff.png";
import SaintSpear from "./Saint Spear.png";
import ScrollEnchantWeaponS from "./Scroll Enchant Weapon S.png";

export const sWeapons = {
  AngelSlayer,
  ArcanaMace,
  BasaltBattlehammer,
  DemonSplinter,
  DraconicBow,
  DragonHunterAxe,
  ForgottenBlade,
  HeavensDivider,
  ImperialStaff,
  SaintSpear,
  ScrollEnchantWeaponS,
};

export const generateWeaponsPathByName = (name) => {
  return sWeapons[name.replace(/\s/g, "")];
};
