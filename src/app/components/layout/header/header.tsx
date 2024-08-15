import React, { useState } from 'react';
import styles from '@/app/components/layout/header/header.module.scss';
import { useSearch } from '@/app/context/search-context';
import {debounce} from "@/app/logic/debounce";

const Header = () => {
  const { setSearchTerm } = useSearch();
  const [ localSearch, setLocalSearch ] = useState("");

  const search = (value) => {
    setLocalSearch(value)
    debounce(() => setSearchTerm(value), 369)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.logo}>WinAPI <span className={styles.search}>Search</span></h1>
      </div>
      <div className={styles.headerCenter}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={localSearch}
          onChange={(e) => search(e.target.value)}
        />
      </div>
      <div className={styles.headerRight}>
        <a href="https://github.com/krystianbajno/winapi-search">GitHub</a>
      </div>
    </header>
  );
};

export default Header;
