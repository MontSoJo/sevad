import React, { useEffect, useState } from "react";
import * as api from "../api";
import "./ProceedingContent.css";

function ProceedingContent() {
  const [proceedingTable, setProceedingTable] = useState(null);
  const [postcodesSelect, setPostcodesSelect] = useState(null);

  const loadAllPostcodes = async () => {
    const postcodes = await api.getAllPostcodes();
    setPostcodesSelect(postcodes);
  };

  const loadProceedingTable = async () => {
    const proceedings = await api.getProceedings();
    setProceedingTable(proceedings);
  };


  useEffect(() => {
    loadAllPostcodes();
    loadProceedingTable();
  }, []);


  let table;
  let select;
  if (proceedingTable === null) {
    table = <div>loading...</div>;
  } else {
    table = (
      <table>
        {proceedingTable.map((proceeding) => (
          <tr>
            <td>{proceeding.proceeding_id}</td>
            <td>{proceeding.name.first}</td>
            <td>{proceeding.name.last}</td>
            <td>{proceeding.phone_numbers}</td>
            <td>{proceeding.address.street}</td>
            <td>{proceeding.address.postcode}</td>
            <td>{proceeding.request_date}</td>
            <td>{proceeding.type}</td>
            <td>{proceeding.status}</td>            
          </tr>
        ))}
      </table>
    );
    select = (
      <select multiple={true} className="select-checkbox" size="5">
        {postcodesSelect.map((postcode) => (          
          <option value={postcode} selected={proceedingTable.some(proceeding => proceeding.address.postcode === postcode)}>{postcode}</option>
        ))}        
      </select>
    );
  }
  
  return (
    <div>
      <form>
        <div>Sol.licituds anteriors a data</div>
        <input type="date" />
        <div>Zones</div>
        {select}
        <input type="submit" value="Filtra" />
      </form>
      <div>{table}</div>
    </div>
  )
}

export default ProceedingContent;
