import React, { useState, createContext } from "react";
import ProceedingList from "./ProceedingList";
import ProceedingSearch from "./ProceedingSearch";
import "./ProceedingContent.css";

export const SearchContext = createContext();

function ProceedingContent() {
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{search, setSearch}}>
      <ProceedingSearch />
      <ProceedingList />
    </SearchContext.Provider>
  )
}

export default ProceedingContent;