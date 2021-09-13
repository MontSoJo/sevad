import React, { useEffect, useState } from 'react';
import * as api from "../api";
import './ValuerInfo.css';

function ValuerInfo() {
  const [valuer, setValuer] = useState(null);
  const [photo, setPhoto] = useState(null);


  const loadValuerInfo = async () => {
    const valuer = await api.getValuer();      
    try {
      if (valuer) { 
        const [photo, error] = await api.getPhoto(valuer.valuer_id);
        if (photo) {
          setPhoto(photo);      
        }
        setValuer(valuer);
      }            
    } catch (err) {
      console.log(err.toString());
    }
  };

  useEffect(() => {
    loadValuerInfo();
  }, []);

  return (    
    <div className= "valuer-info-header">
      <div>
      <div className="user-nav">{valuer === null ? 'loading...' : valuer.name.first + ' ' + valuer.name.last}</div>
      <div className="zone-nav">{valuer === null ? 'loading...' : `Zona: ${valuer.postcodes.join(', ')}`}</div>
      </div>
      <div>{photo === null ? 'loading...' : <img className="img-profile" src={photo}/>}</div>
    </div>
  )
}

export default ValuerInfo;