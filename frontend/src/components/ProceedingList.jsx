import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "./ProceedingContent";
import * as api from "../api";
import "./ProceedingList.css";

function ProceedingList() {
  const [proceedingTable, setProceedingTable] = useState(null);
  const { search } = useContext(SearchContext);

  const loadProceedingTable = async () => {    
    const proceedings = await api.getProceedings(search !== '' ? `?${search}` : '');
    setProceedingTable(proceedings);
  };

  useEffect(() => {
    loadProceedingTable();
  }, [search]);

  let table;
  let tableHeader;
  tableHeader = ["D.Sol.licitud", "Id. Procés", "Nom i Cognoms", "Adreça", "CP", "Tipus de Procés", "Telèfons"]
  if (proceedingTable === null) {
    table = <div>loading...</div>;
  } else {
    table = (
      <table>
        <tr>
          {tableHeader.map((header) => (<th>{header}</th>))}
        </tr>
        {proceedingTable.map((proceeding) => (
          <tr>
            <td>{proceeding.request_date}</td>
            <td>{proceeding.proceeding_id}</td>
            <td>{proceeding.name.first} {proceeding.name.last}</td>
            <td>{proceeding.address.street}</td>
            <td>{proceeding.address.postcode}</td>
            <td>{proceeding.type}</td>
            <td>{proceeding.phone_numbers}</td>
          </tr>
        ))}
      </table>
    );
  }

  return (
    <div>
      <div>{table}</div>
    </div>
  )
}

export default ProceedingList;
