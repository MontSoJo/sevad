import React, { useEffect, useState, useContext } from "react";
import { WeekContext } from "./VisitsOfTheWeekContent";
import * as api from "../api";
import './VisitsOfTheDayList.css';

const daysInCatalan = ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'];

function VisitsOfTheDayList({visitDate}) {
  const [visitsOfTheDay, setVisitsOfTheDay] = useState(null);
  const weekStart = useContext(WeekContext);

  const loadVisitsOfTheDay = async () => {    
    const visits = await api.getVisitsOfTheDay(visitDate);
    setVisitsOfTheDay(visits);
  };

  useEffect(() => {
    loadVisitsOfTheDay();
  }, [weekStart]);

  let table;
  let newVisitDate, day, dd, mm;
  if (visitsOfTheDay === null) {
    table = <div>loading...</div>;
  } else {    
    newVisitDate = new Date(visitDate);
    day = newVisitDate.getDay();
    dd = newVisitDate.getDate();
    dd = dd < 10 ? '0' + dd : dd;
    mm = newVisitDate.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;          
    table = (
      <table>
        <thead><tr><th colSpan='2'>{`${daysInCatalan[day]} ${dd}/${mm}`}</th></tr></thead>
        <tbody>
          {visitsOfTheDay.map((visit) => {
            return (
            <tr>
              <td>{visit.visit_date.slice(11, 16)}</td>
              <td>{visit.proceeding_ObjectId.name.first} {visit.proceeding_ObjectId.name.last}</td>
            </tr>
          )})}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <div>{table}</div>
    </div>
  )
}

export default VisitsOfTheDayList;