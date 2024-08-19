import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchTerm: string;
  showContents: boolean;
  showSyscalls: boolean;
  handleToggleSyscalls: () => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleToggleContents: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showContents, setShowContents] = useState(true);
  const [showSyscalls, setShowSyscalls] = useState(false);

  const handleToggleContents = () => {
    setShowContents(prevState => !prevState);
  };

  const handleToggleSyscalls = () => {
    setShowSyscalls(prevState => !prevState);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, showSyscalls, handleToggleSyscalls, setSearchTerm, showContents, handleToggleContents }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
