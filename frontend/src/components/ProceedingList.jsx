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
  let requetDate, dd, mm;
  tableHeader = ["Sel.","D.Sol.licitud","Id. Procés","Nom i Cognoms","Adreça","CP","Tipus de Procés","Telèfons"]
  if (proceedingTable === null) {
    table = <div>loading...</div>;
  } else {
    table = (
      <table>
        <thead>
          <tr>
            {tableHeader.map((header) => (<th>{header}</th>))}
          </tr>
        </thead>
        <tbody>
          {proceedingTable.map((proceeding) => {
            requetDate = new Date(proceeding.request_date);
            dd = requetDate.getDate();
            dd = dd < 10 ? '0' + dd : dd;
            mm = requetDate.getMonth() + 1;
            mm = mm < 10 ? '0' + mm : mm;          
            return (
            <tr>
              <td><input type="radio" name="proceeding" value={proceeding._id} /></td>
              <td>{`${dd}/${mm}/${requetDate.getFullYear()}`}</td>
              <td>{proceeding.proceeding_id}</td>
              <td>{proceeding.name.first} {proceeding.name.last}</td>
              <td>{proceeding.address.street}</td>
              <td>{proceeding.address.postcode}</td>
              <td>{proceeding.type}</td>
              <td>{proceeding.phone_numbers.join(', ')}</td>
            </tr>
          )})}
        </tbody>
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