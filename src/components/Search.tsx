import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import styles from "@/styles/components/Search.module.scss";

import { getMatchHistory, getMatchesSummary, getSummoner } from "@/app/_queries/search";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const [search, setSearch] = useDebounce("", 600);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
    console.log("fired");
  };

  const { data: summonerData } = useQuery({
    queryKey: ["search", search],
    queryFn: () => {
      console.log("fetching");
      return getSummoner(search);
    },
    enabled: !!search,
  });

  const { data: matchesSummaryData, isLoading: isMatchHistoryLoading } = useQuery(
    {
      queryKey: ["matchesSummary", summonerData?.puuid],
      queryFn: () => getMatchesSummary(summonerData?.puuid),
      enabled: !!summonerData?.puuid,
    }
  );

  if (summonerData) console.log(summonerData);
  if (matchesSummaryData) console.log(matchesSummaryData);

  return (
    <div className={styles.searchBox}>
      <button className={styles.searchBtn}>
        <MagnifyingGlassIcon className={styles.icon} />
      </button>
      <input
        type="text"
        placeholder="Search for profile"
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
