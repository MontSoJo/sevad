import React, { useState } from 'react';
import * as api from '../api';
import './ProceedingList.css';

function ProceedingList() {
  const [proceedingList, setProceedingList] = useState(null);

  let list;
  if (proceedingList === null) {
    list = <div>loading...</div>    
  } else {
    list = <ul>
      { proceedingList.map(proceeding => <li key={proceeding._id}>{proceeding.proceeding_id}</li>) }
    </ul>
  }

  return (
    <div>
      <h1>Llista de processos</h1>
      {list}
    </div>
  )
}

export default ProceedingList;