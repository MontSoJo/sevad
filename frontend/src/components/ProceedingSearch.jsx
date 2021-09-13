import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "./ProceedingContent";
import { v4 as uuidv4 } from "uuid";
import * as api from "../api";
import "./ProceedingSearch.css";

function ProceedingSearch({ initSelectedPostcodes }) {
  const [postcodes, setPostcodes] = useState([]);
  const [requestDate, setRequestDate] = useState(new Date().toISOString().slice(0, 10));
  const { setSearch } = useContext(SearchContext);

  const loadAllPostcodes = async () => {
    try {
      const allPostcodes = await api.getAllPostcodes();
      if (allPostcodes) {
        setPostcodes(allPostcodes);
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  useEffect(() => {
    loadAllPostcodes();
  }, []);

  const handleSelect = (e) => {
    let newPostcode = {};
    setPostcodes(
      postcodes.map((item) => {
        newPostcode = {
          postcode: item.postcode,
          selected: [...e.target.selectedOptions]
            .map((option) => option.value)
            .includes(item.postcode),
        };
        return newPostcode;
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newSearch = new URLSearchParams(
      postcodes.filter((item) => item.selected === true).map((item) => ["postcode", item.postcode])
    );
    newSearch.append('date', requestDate);
    if (newSearch) {
      setSearch(newSearch.toString());
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Sol.licituds anteriors a: 
          <input
            type="date"
            value={requestDate}
            onChange={(e) => setRequestDate(e.target.value)}
          />
        </label>
        <label>
          Zones: 
          <select
            multiple={true}
            className="select-checkbox"
            size="5"
            value={postcodes.filter((item) => item.selected === true).map((item) => item.postcode)}
            onChange={handleSelect}
          >
            {postcodes.map((item) => (
              <option key={uuidv4()} value={item.postcode}>
                {item.postcode}
              </option>
            ))}
          </select>
        </label>
        <input className="btn-search" type="submit" value="Buscar" />
      </form>
    </div>
  );
}

export default ProceedingSearch;