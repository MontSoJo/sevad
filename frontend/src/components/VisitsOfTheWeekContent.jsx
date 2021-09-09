import React, { useState, createContext } from "react";
import VisitsOfTheDayList from "./VisitsOfTheDayList";
import "./VisitsOfTheWeekContent.css";

const TIME_ONE_DAY = 60 * 60 * 24 * 1000;  

export const WeekContext = createContext();

function getRelativeDayInWeek(dt, dy) {
  dt = new Date(dt);
  let day = dt.getDay();
  let diff = dt.getDate() - day + (day === 0 ? -6 : dy);
  return new Date(dt.setDate(diff));
}

function VisitsOfTheWeekContent() {
  const [weekStart, setWeekStart] = useState(getRelativeDayInWeek(new Date(), 1));

  return (
    <WeekContext.Provider value={{weekStart}}>
      <div className="week-container">
        <VisitsOfTheDayList visitDate={weekStart.toISOString().slice(0, 10)} />
        <VisitsOfTheDayList visitDate={new Date(weekStart.getTime() + TIME_ONE_DAY).toISOString().slice(0, 10)} />      
        <VisitsOfTheDayList visitDate={new Date(weekStart.getTime() + TIME_ONE_DAY * 2).toISOString().slice(0, 10)} />      
        <VisitsOfTheDayList visitDate={new Date(weekStart.getTime() + TIME_ONE_DAY * 3).toISOString().slice(0, 10)} />
        <VisitsOfTheDayList visitDate={new Date(weekStart.getTime() + TIME_ONE_DAY * 4).toISOString().slice(0, 10)} />
      </div>
      <button onClick={(e) => setWeekStart(new Date(weekStart.getTime() - TIME_ONE_DAY * 7))}>setmana anterior</button>
      <button onClick={(e) => setWeekStart(new Date(weekStart.getTime() + TIME_ONE_DAY * 7))}>setmana següent</button>
    </WeekContext.Provider>
  )
}

export default VisitsOfTheWeekContent;