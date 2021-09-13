import React, { useState, createContext } from "react";
import ProceedingList from "./ProceedingList";
import ProceedingMap from "./ProceedingMap";
import ProceedingSearch from "./ProceedingSearch";
import "./ProceedingContent.css";

export const SearchContext = createContext();

function ProceedingContent() {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(true);

  let content;
  if (toggle) {
    content = <ProceedingList />;
  } else {
    content = <ProceedingMap />;
  }

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <ProceedingSearch />
      <input
        type="button"
        value="Llista"
        className={`btn-list ${toggle ? "clicked" : "no-clicked"}`}
        onClick={(e) => setToggle(!toggle)}
      />
      <input
        type="button"
        value="Mapa"
        className={`btn-map ${toggle ? "no-clicked" : "clicked"}`}
        onClick={(e) => setToggle(!toggle)}
      />
      {content}
    </SearchContext.Provider>
  );
}

export default ProceedingContent;
