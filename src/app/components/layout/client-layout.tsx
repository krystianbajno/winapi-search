"use client";

import React from "react";
import Header from "@/app/components/layout/header/header";
import { SearchProvider } from "@/app/context/search-context";
import styles from "./client-layout.module.scss"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <div className="page-wrap">
        <Header />
        <div className={styles.headerBreak}></div>
        {children}
      </div>
    </SearchProvider>
  );
}