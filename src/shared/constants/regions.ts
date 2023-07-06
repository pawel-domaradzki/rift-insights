export const Regions = {
  Brazil: "BR1",
  Europe_East: "EUN1",
  Europe_West: "EUW1",
  Korea: "KR",
  Lat_North: "LA1",
  Lat_South: "LA2",
  North_America: "NA1",
  Oceania: "OC1",
  Turkey: "TR1",
  Russia: "RU",
  Japan: "JP1",
  Philippines: "PH2",
  Singapore: "SG2",
  Taiwan: "TW2",
  Thailand: "TH2",
  Vietnam: "VN2",
};

export const GroupedRegions = {
  Americas: [
    Regions.North_America,
    Regions.Brazil,
    Regions.Lat_North,
    Regions.Lat_South,
  ],
  Asia: [Regions.Korea, Regions.Japan],
  Europe: [
    Regions.Europe_East,
    Regions.Europe_West,
    Regions.Turkey,
    Regions.Russia,
  ],
  SEA: [
    Regions.Oceania,
    Regions.Philippines,
    Regions.Singapore,
    Regions.Taiwan,
    Regions.Thailand,
    Regions.Vietnam,
  ],
};



export const GroupToApiRegion = {
  AMERICAS: "americas",
  ASIA: "asia",
  EUROPE: "europe",
  SEA: "sea",
};

export const getRegionOptions = () => {
  return Object.entries(Regions).map(([displayName, value]) => ({
    displayName: displayName.replace("_", " "),
    value: value,
  }));
};
