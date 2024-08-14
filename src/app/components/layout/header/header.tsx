import React from 'react';
import styles from './header.module.scss';
import { useSearch } from '@/app/context/search-context';

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.logo}>WinAPI Search</h1>
      </div>
      <div className={styles.headerCenter}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.headerRight}>
        <a href="https://github.com/krystianbajno/winapi-search">GitHub</a>
      </div>
    </header>
  );
};

export default Header;
