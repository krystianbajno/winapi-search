"use client";

import React from "react";
import Header from "@/app/components/layout/header/header";
import { SearchProvider } from "@/app/context/search-context";
import styles from "@/app/components/layout/client-layout.module.scss";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <div className="page-wrap">
        <Header />
        {children}
      </div>
    </SearchProvider>
  );
}
