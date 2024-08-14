'use client';

import styles from "./page.module.scss";
import WinApiSearch from "./components/winapi-search/winapi-search";
import { useState } from 'react';
import ToggleDllContentsSwitch from './components/controls/toggle-dll-contents-switch';


export default function Home() {
  const [showContents, setShowContents] = useState(true);

  const handleToggle = () => {
    setShowContents(prevState => !prevState);
  };

  return (
    <main className={styles.main}>
      <section className={styles.pageSection} id="winapi-search">
        <ToggleDllContentsSwitch isChecked={showContents} onToggle={handleToggle}/>
        <WinApiSearch showContents={showContents} />
      </section>
    </main>
  );
}
