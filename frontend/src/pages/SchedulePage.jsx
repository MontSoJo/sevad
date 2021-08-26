import React from 'react';

function SchedulePage({ onLogout }) {
  return (
    <div>
      <button onClick={onLogout}>Tancar sessió</button>
      <h1>Estic a la pàgina programació de visites</h1>
    </div>
  )
}

export default SchedulePage;