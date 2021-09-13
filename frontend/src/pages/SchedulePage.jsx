import React, { useState, createContext } from "react";
import "./SchedulePage.css";
import Title from "../components/Title";
import ValuerInfo from "../components/ValuerInfo";
import VisitsOfTheWeekContent from "../components/VisitsOfTheWeekContent";
import ProceedingContent from "../components/ProceedingContent";

export const ScheduleContext = createContext();

function SchedulePage({ onLogout }) {
  const [proceedingIdSelected, setProceedingIdSelected] = useState();
  const [visitAdded, setVisitAdded] = useState(false);

  return (
    <ScheduleContext.Provider
      value={{
        proceedingIdSelected,
        setProceedingIdSelected,
        visitAdded,
        setVisitAdded,
      }}
    >
      <div className="schedule-page">
        <div className="nav">
        <Title />
        <div className="login-nav">
        <ValuerInfo />
        <button onClick={onLogout}>Tancar sessió</button>
        </div>
        </div>
        <div className="program">
        <VisitsOfTheWeekContent />
        <ProceedingContent />
        </div>
      </div>
    </ScheduleContext.Provider>
  );
}

export default SchedulePage;
