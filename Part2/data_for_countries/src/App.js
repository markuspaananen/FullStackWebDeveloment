import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({ countries }) => {
  if (countries != null) {
    if (countries.length === 1) {
      console.log('length is 1 and data is ', { countries });
      return (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area}</p>

          <ul>
            {Object.values(countries[0].languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>

          <img src={countries[0].flags.png} alt={countries[0].flags.alt} />


        </div>
      );
    }
    if (countries.length <= 10) {
      return (
        <div>
          <ul>
            {countries.map(country => (
              <li key={country.name.common}>{country.name.common}</li>
            ))}
          </ul>
        </div>
      );
    }
    else {
      return (
        <p>Too many matches, specify another filter.</p>
      )
    }
  } else {
    return null;
  }
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
        console.log('fetch request');
      })
      .catch(error => {
        console.log('Error fetching countries:', error);
      });
  }, []);

  const searchCountry = event => {

    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries
    ?
    countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    : null;

  return (
    <div>
      <div>
        <form>
          <input type="text" onChange={searchCountry} />
        </form>
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
