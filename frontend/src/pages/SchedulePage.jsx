import React, { useState } from 'react';
import "./SchedulePage.css";
import Title from '../components/Title';
import ValuerInfo from '../components/ValuerInfo';
import ProceedingContent from '../components/ProceedingContent';

function SchedulePage({ onLogout }) {
  return (
    <div className="schedule-page">
      <Title />
      <ValuerInfo />
      <button onClick={onLogout}>Tancar sessió</button>
      <ProceedingContent />
    </div>
  )
}

export default SchedulePage;