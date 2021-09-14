import React, { useState, useEffect, createContext, useContext } from "react";
import { ScheduleContext } from "../pages/SchedulePage";
import ProceedingList from "./ProceedingList";
import ProceedingMap from "./ProceedingMap";
import ProceedingSearch from "./ProceedingSearch";
import * as api from "../api";
import "./ProceedingContent.css";

export const SearchContext = createContext();

function ProceedingContent() {
  const [proceedingData, setProceedingData] = useState(null);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(true);

  const { setProceedingIdSelected, visitAdded } = useContext(ScheduleContext);

  const loadProceedingData = async () => {
    try {
      const proceedings = await api.getProceedings(
        search !== "" ? `?${search}` : ""
      );
      if (proceedings) {
        setProceedingData(proceedings);
        setProceedingIdSelected(proceedings[0]._id);
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  useEffect(() => {
    loadProceedingData();
  }, [search, visitAdded]);

  let content;
  if (proceedingData === null) {
    content = <div>loading...</div>;
  } else {
    if (toggle) {
      content = <ProceedingList proceedingData={proceedingData}/>;
    } else {
      content = <ProceedingMap proceedingData={proceedingData}/>;
    }
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
