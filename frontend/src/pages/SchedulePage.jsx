import React, { useState } from 'react';
import "./SchedulePage.css";
import ProceedingTable from '../components/ProceedingTable';

function SchedulePage({ onLogout }) {

  return (
    <div className="schedule-page">
      <button onClick={onLogout}>Tancar sessió</button>
      <h1>Pàgina programació de visites</h1>
      <ProceedingTable />
    </div>
  )
}

export default SchedulePage;