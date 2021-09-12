import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "./ProceedingContent";
import { ScheduleContext } from "../pages/SchedulePage";
import { v4 as uuidv4 } from "uuid";
import * as api from "../api";
import "./ProceedingList.css";

function ProceedingList() {
  const [proceedingTable, setProceedingTable] = useState(null);
  const { search } = useContext(SearchContext);
  const { proceedingIdSelected, setProceedingIdSelected, visitAdded } =
    useContext(ScheduleContext);

  const loadProceedingTable = async () => {
    const proceedings = await api.getProceedings(
      search !== "" ? `?${search}` : ""
    );
    setProceedingTable(proceedings);
    setProceedingIdSelected(proceedings[0]._id);
  };

  useEffect(() => {
    loadProceedingTable();
  }, [search, visitAdded]);

  let table;
  let tableHeader;
  let requetDate, dd, mm;
  tableHeader = [
    "Sel.",
    "D.Sol.licitud",
    "Id. Procés",
    "Nom i Cognoms",
    "Adreça",
    "CP",
    "Tipus de Procés",
    "Telèfons",
  ];
  if (proceedingTable === null) {
    table = <div>loading...</div>;
  } else {
    table = (
      <table>
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <th key={uuidv4()}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {proceedingTable.map((proceeding) => {
            requetDate = new Date(proceeding.request_date);
            dd = requetDate.getDate();
            dd = dd < 10 ? "0" + dd : dd;
            mm = requetDate.getMonth() + 1;
            mm = mm < 10 ? "0" + mm : mm;
            return (
              <tr key={proceeding._id}>
                <td>
                  <input
                    type="radio"
                    name="proceedings"
                    value={proceeding._id}
                    checked={proceeding._id === proceedingIdSelected}
                    onChange={(e) => setProceedingIdSelected(e.target.value)}
                  />
                </td>
                <td>{`${dd}/${mm}/${requetDate.getFullYear()}`}</td>
                <td>{proceeding.proceeding_id}</td>
                <td>{proceeding.name.first} {proceeding.name.last}</td>
                <td>{proceeding.address.street}</td>
                <td>{proceeding.address.postcode}</td>
                <td>{proceeding.type}</td>
                <td>{proceeding.phone_numbers.join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <div>{table}</div>
    </div>
  );
}

export default ProceedingList;
