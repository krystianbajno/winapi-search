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
    <>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <h1 className={styles.logo}><a href="/">WinAPI <span className={styles.search}>Search</span></a></h1>
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
            <a href="https://github.com/krystianbajno/winapi-search">
              <img className={styles.githubLogo} src="/images/github-mark-white.svg" />
            </a>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                value={localSearch}
                onChange={(e) => search(e.target.value)}
            />
        </div>
      </header>
      <div className={styles.headerBreak}></div>
    </>
  );
};

export default Header;
