import axios from "axios";
import React, { useEffect, useState } from "react";
import "./search.css";

function Search() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [debounce, setDebounceSearchTerm] = useState("");
  

  useEffect(() => {
    const getCountries = async () => {
      try {
        let response = await axios.get(`https://restcountries.com/v3.1/all`);
        let data = response.data;

        setCountries(data);

        console.log("dts", data);
      } catch (error) {
        setError(error);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    let debounceTimer = setTimeout(() => {
      setDebounceSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(debounce.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="search for countries"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      {error && <p>Error fetching data</p>}
      <div className="countryGrid">
        {filterCountries.map((countryElem) => (
          <div className="countryCard" key={countryElem.name.common}>
            <img
              src={countryElem.flags.png}
              alt={`${countryElem.name.common}flag`}
            />
            <h3>{countryElem.name.common}</h3>
            <p>Population:{countryElem.population}</p>
            <p>Region: {countryElem.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
