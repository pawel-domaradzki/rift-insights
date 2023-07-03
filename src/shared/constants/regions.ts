export enum Regions {
  BRAZIL = "BR1",
  EU_EAST = "EUN1",
  EU_WEST = "EUW1",
  KOREA = "KR",
  LAT_NORTH = "LA1",
  LAT_SOUTH = "LA2",
  AMERICA_NORTH = "NA1",
  OCEANIA = "OC1",
  TURKEY = "TR1",
  RUSSIA = "RU",
  JAPAN = "JP1",
  PHILIPPINES = "PH2",
  SINGAPORE_MALAYSIA_INDONESIA = "SG2",
  TAIWAN_HONGKONG_MACAO = "TW2",
  THAILAND = "TH2",
  VIETNAM = "VN2",
  PUBLIC_BETA = "PBE1",
}

export const GroupedRegions = {
  AMERICAS: [
    Regions.AMERICA_NORTH,
    Regions.BRAZIL,
    Regions.LAT_NORTH,
    Regions.LAT_SOUTH,
  ],
  ASIA: [Regions.KOREA, Regions.JAPAN],
  EUROPE: [Regions.EU_EAST, Regions.EU_WEST, Regions.TURKEY, Regions.RUSSIA],
  SEA: [
    Regions.OCEANIA,
    Regions.PHILIPPINES,
    Regions.SINGAPORE_MALAYSIA_INDONESIA,
    Regions.TAIWAN_HONGKONG_MACAO,
    Regions.THAILAND,
    Regions.VIETNAM,
  ],
};

export const RegionToApiBase = {
  [Regions.BRAZIL]: "br1",
  [Regions.EU_EAST]: "eun1",
  [Regions.EU_WEST]: "euw1",
  [Regions.KOREA]: "kr",
  [Regions.LAT_NORTH]: "la1",
  [Regions.LAT_SOUTH]: "la2",
  [Regions.AMERICA_NORTH]: "na1",
  [Regions.OCEANIA]: "oc1",
  [Regions.TURKEY]: "tr1",
  [Regions.RUSSIA]: "ru",
  [Regions.JAPAN]: "jp1",
  [Regions.PHILIPPINES]: "ph2",
  [Regions.SINGAPORE_MALAYSIA_INDONESIA]: "sg2",
  [Regions.TAIWAN_HONGKONG_MACAO]: "tw2",
  [Regions.THAILAND]: "th2",
  [Regions.VIETNAM]: "vn2",
  [Regions.PUBLIC_BETA]: "pbe1",
};

export const GroupToApiRegion = {
  AMERICAS: "americas",
  ASIA: "asia",
  EUROPE: "europe",
  SEA: "sea",
};
