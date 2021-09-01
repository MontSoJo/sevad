import React, { useEffect, useState } from 'react';
import * as api from "../api";
import './ValuerInfo.css';

function ValuerInfo() {
  const [valuer, setValuer] = useState(null);

  const loadValuerInfo = async () => {
    const valuer = await api.getValuer();
    setValuer(valuer);
  };

  useEffect(() => {
    loadValuerInfo();
  }, []);

  return (    
    <div className="valuer-info-header">
      <div>{valuer === null ? 'loading...' : valuer.name.first + ' ' + valuer.name.last}</div>
      <div>{valuer === null ? 'loading...' : valuer.postcodes.toString()}</div>      
    </div>
  )
}

export default ValuerInfo;