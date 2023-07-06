import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import styles from "@/styles/components/Search.module.scss";

import { getMatchesSummary, getSummoner } from "@/app/_queries/search";
import SelectDropdown from "./ui/SelectDropdown";
import { getRegionOptions } from "@/shared/constants/regions";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const regionOptions = getRegionOptions();
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(
    regionOptions[6].value
  );
  const [search, setSearch] = useDebounce("", 600);

  const {
    data: summonerData,
    isLoading: summonerLoading,
    refetch: refetchSummoner,
  } = useQuery({
    queryKey: ["search", search, selectedDropdownValue],
    queryFn: () => {
      console.log("fetching");
      return getSummoner(search, selectedDropdownValue);
    },
    enabled: !!search,
  });

  const { data: matchesSummaryData, isLoading: isMatchHistoryLoading } =
    useQuery({
      queryKey: ["matchesSummary", summonerData?.puuid],
      queryFn: () => getMatchesSummary(summonerData?.puuid),
      enabled: !!summonerData?.puuid,
    });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearch(event.target.value);
  };

  const handleDropdownChange = (value: string) => {
    setSelectedDropdownValue(value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    refetchSummoner();
  };

  const DisplaySummoner = () => {
    if (!search) return <></>;
    if (summonerLoading) return <div>Loading...</div>;
    return summonerData ? (
      <div>{`${summonerData.name}  ${summonerData.region}`}</div>
    ) : (
      <div>not found</div>
    );
  };

  if (summonerData) console.log(summonerData);
  if (matchesSummaryData) console.log(matchesSummaryData);

  return (
    <>
      <div className={styles.searchBox}>
        <button className={styles.searchBtn} onClick={handleButtonClick}>
          <MagnifyingGlassIcon className={styles.icon} />
        </button>
        <input
          type="text"
          placeholder="Search for summoner profiles"
          onChange={handleInputChange}
        />
        <SelectDropdown
          items={regionOptions}
          onChange={handleDropdownChange}
          defaultValue={selectedDropdownValue}
        />
      </div>

      {/* <SelectDropdown
        items={["one", "two"]}
        onChange={handleDropdownChange}
        defaultValue={selectedDropdownValue}
      /> */}

      <DisplaySummoner />
    </>
  );
};

export default Search;
