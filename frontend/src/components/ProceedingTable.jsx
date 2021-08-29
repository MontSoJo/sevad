import React, { useEffect, useState } from "react";
import * as api from "../api";
import "./ProceedingTable.css";

function ProceedingTable() {
  const [proceedingTable, setProceedingTable] = useState(null);

  const loadProceedingTable = async () => {
    const proceedings = await api.getAllProceedings();
    setProceedingTable(proceedings);
  };

  useEffect(() => {
    loadProceedingTable();
  }, []);

  let table;
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
  }

  return <div>{table}</div>;
}

export default ProceedingTable;
