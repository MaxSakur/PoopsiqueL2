import Cabrio from "./Cabrio.jpg";
import Korim from "./Korim.jpg";
import RoaringSkylancer from "./Roaring Skylancer.jpg";
import Lokness from "./Lokness.jpg";
import PalibatiQueenThemis from "./Palibati Queen Themis.jpg";
import Behemoth from "./Behemoth.jpg";
import Zakaron from "./Zakaron.jpg";
import MeanasAnor from "./Meanas Anor.jpg";
import EilhalderVonHellmann from "./Eilhalder Von Hellmann.jpg";
import ImmortalSaviorMardil from "./Immortal Savior Mardil.jpg";
import WaterDragonSeerSheshark from "./Water Dragon Seer Sheshark.jpg";
import VanorChiefKandra from "./Vanor Chief Kandra.jpg";
import Tanatos from "./Tanatos.jpg";
import FlameofSplendorBarakiel from "./Flame of Splendor Barakiel.jpg";
import DeathLordHallate from "./Death Lord Hallate.jpg";
import PlagueGolem from "./Plague Golem.jpg";
import Cloe from "./Cloe.jpg";
import KrokianPadishaSobekk from "./Krokian Padisha Sobekk.jpg";
import IcicleEmperorBumbalump from "./Icicle Emperor Bumbalump.jpg";
import Kernon from "./Kernon.jpg";
import StormWingedNaga from "./Storm Winged Naga.jpg";
import LastLesserGiantOlkuth from "./Last Lesser Giant Olkuth.jpg";
import PalatanosofHorrificPower from "./Palatanos of Horrific Power.jpg";
import Decarbia from "./Decarbia.jpg";
import DeathLordIpos from "./Death Lord Ipos.jpg";
import DeathLordShax from "./Death Lord Shax.jpg";
import FlamestoneGiant from "./Flamestone Giant.jpg";
import OceanFlameAshakiel from "./Ocean Flame Ashakiel.jpg";
import FireOfWrathShuriel from "./Fire Of Wrath Shuriel.jpg";
import LastLesserGiantGlaki from "./Last Lesser Giant Glaki.jpg";
import Hestia from "./Hestia.jpg";
import Golkonda from "./Golkonda.jpg";
import Galaxia from "./Galaxia.jpg";
import QueenShyeed from "./Queen Shyeed.jpg";
import KetraHeroHekaton from "./Ketra Hero Hekaton.jpg";
import VarkaHeroShadith from "./Varka Hero Shadith.jpg";
import KetraChiefBrakki from "./Ketra Chief Brakki.jpg";
import VarkaChiefHorus from "./Varka Chief Horus.jpg";
import Sailren from "./Sailren.jpg";
import KetraCommanderTayr from "./Ketra Commander Tayr.jpg";
import VarkaCommanderMos from "./Varka Commander Mos.jpg";
import Ember from "./Ember.jpg";
import Uruka from "./Uruka.jpg";
import AndreasVanHalter from "./Andreas Van Halter.jpg";
import Anais from "./Anais.jpg";

export const images = {
  Anais,
  AndreasVanHalter,
  Uruka,
  Ember,
  VarkaChiefHorus,
  VarkaHeroShadith,
  VarkaCommanderMos,
  Sailren,
  KetraChiefBrakki,
  KetraCommanderTayr,
  KetraHeroHekaton,
  QueenShyeed,
  Galaxia,
  Golkonda,
  Hestia,
  LastLesserGiantGlaki,
  LastLesserGiantOlkuth,
  FireOfWrathShuriel,
  OceanFlameAshakiel,
  DeathLordHallate,
  DeathLordIpos,
  FlamestoneGiant,
  DeathLordShax,
  Decarbia,
  PalatanosofHorrificPower,
  StormWingedNaga,
  Kernon,
  IcicleEmperorBumbalump,
  Behemoth,
  KrokianPadishaSobekk,
  Cloe,
  PlagueGolem,
  FlameofSplendorBarakiel,
  Tanatos,
  VanorChiefKandra,
  WaterDragonSeerSheshark,
  ImmortalSaviorMardil,
  EilhalderVonHellmann,
  MeanasAnor,
  Zakaron,
  PalibatiQueenThemis,
  Lokness,
  RoaringSkylancer,
  Korim,
  Cabrio,
};

export const generatePathByName = (name) => {
  return images[name.replace(/\s/g, "")];
};
