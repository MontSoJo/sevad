import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "./ProceedingContent";
import * as api from "../api";
import "./ProceedingSearch.css";

function ProceedingSearch({ initSelectedPostcodes }) {
  const [postcodes, setPostcodes] = useState([]);
  const { setSearch } = useContext(SearchContext);

  const loadAllPostcodes = async () => {    
    const allPostcodes = await api.getAllPostcodes();        
    setPostcodes(allPostcodes);
  };

  useEffect(() => {
    loadAllPostcodes();
  }, []);
  
  const handleSelect = (e) => {    
    let newPostcode = {};
    setPostcodes(
      postcodes.map((item) => {
        newPostcode = { postcode: item.postcode, selected: [...e.target.selectedOptions].map(option => option.value).includes(item.postcode) };
        return newPostcode;
      })
    );
  };

  const handleSearch = (e) => {    
    e.preventDefault();            
    let newSearch = new URLSearchParams(postcodes.filter(item => item.selected === true).map(item => ['postcode', item.postcode]));    
    if (newSearch) {
      setSearch(newSearch.toString());
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>Sol.licituds anteriors a data</div><input type="date"/>
        <div>Zones</div>
        <select multiple={true} className="select-checkbox" size="5" onChange={handleSelect}>
          {postcodes.map((item) => (          
            <option value={item.postcode} selected={item.selected}>{item.postcode}</option>
          ))}        
        </select>
        <input type="submit" value="Buscar" />        
      </form>
    </div>
  )
}

export default ProceedingSearch;
