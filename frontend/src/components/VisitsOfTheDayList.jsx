import React, { useEffect, useState, useContext } from "react";
import { WeekContext } from "./VisitsOfTheWeekContent";
import { ScheduleContext } from "../pages/SchedulePage";
import * as api from "../api";
import './VisitsOfTheDayList.css';

const daysInCatalan = ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'];

function VisitsOfTheDayList({visitDate}) {
  const [visitsOfTheDay, setVisitsOfTheDay] = useState(null);
  const [newVisitTime, setNewVisitTime] = useState('');
  const weekStart  = useContext(WeekContext);
  const { proceedingIdSelected, visitAdded, setVisitAdded } = useContext(ScheduleContext);

  const loadVisitsOfTheDay = async () => {    
    const visits = await api.getVisitsOfTheDay(visitDate);
    setVisitsOfTheDay(visits);
  };

  useEffect(() => {
    loadVisitsOfTheDay();
  }, [weekStart]);

  const handleAddVisit = async (e) => {
    if (newVisitTime) {
      let visitDateTime = new Date(visitDate);
      visitDateTime.setUTCHours(newVisitTime.slice(0,2));
      visitDateTime.setUTCMinutes(newVisitTime.slice(3,5));
      const newVisit = await api.addVisit(visitDateTime.toISOString(), proceedingIdSelected);
      if (newVisit) {
        setNewVisitTime('');
        loadVisitsOfTheDay();
        setVisitAdded(!visitAdded);  
      }
    }  
  };

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
        <thead>
          <tr>
            <th colSpan='2'>
              {`${daysInCatalan[day]} ${dd}/${mm}`}
              <input type="time" value={newVisitTime} onChange={(e) => setNewVisitTime(e.target.value)} />
              <input type="button" value="+" onClick={handleAddVisit}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {visitsOfTheDay.map((visit) => {            
            let prova1 = {...visit.proceeding_ObjectId};
            let prova2 = {...prova1};
            let prova3 = {...prova2.name};
            //console.log(prova3.last);
            return (
            <tr key={visit._id}>
              <td>{visit.visit_date.slice(11, 16)}</td>
              <td>{prova3.first} {prova3.last}</td>
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