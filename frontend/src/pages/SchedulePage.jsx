import React, { useState, createContext } from 'react';
import "./SchedulePage.css";
import Title from '../components/Title';
import ValuerInfo from '../components/ValuerInfo';
import VisitsOfTheWeekContent from '../components/VisitsOfTheWeekContent';
import ProceedingContent from '../components/ProceedingContent';

function SchedulePage({ onLogout }) {
  return (
    <div className="schedule-page">
      <Title />
      <ValuerInfo />
      <button onClick={onLogout}>Tancar sessió</button>
      <VisitsOfTheWeekContent />
      <ProceedingContent />
    </div>
  )
}

export default SchedulePage;