import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import styles from "@/styles/components/Search.module.scss";

import { getSummoner } from "@/app/_queries/search";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const [search, setSearch] = useDebounce("", 600);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
    console.log("fired");
  };

  const { isLoading, error, isError, data } = useQuery({
    queryKey: ["search", search],
    queryFn: () => {
      console.log("fetching");
      return getSummoner(search);
    },
    enabled: !!search,
  });

  if (data) console.log(data);

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
