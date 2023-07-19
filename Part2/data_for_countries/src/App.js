import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CountryInfo = (props) => {
  const country = props.country;
  if (!country) {
    return null;
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

const Countries = (props) => {
  const countries = props.countries
  if (countries != null) {
    if (countries.length === 1) {
        return <CountryInfo country={countries[0]} />;
    }

    console.log(`Inside countries, `, { countries });

    //console.log({showCountry} );

    if (countries.length <= 10) {
      return (
        <div>
          <div>
            <ul>
              {countries.map(country => (
                <li key={country.name.common}>{country.name.common}<button onClick={() =>
                  props.handleShowCountry(country)}>Show</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <CountryInfo country={props.showCountry}/>
          </div>
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
  const [showCountry, setShowCountry] = useState(null);

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

  const handleCountrySearch = event => {
    setSearchTerm(event.target.value);
  };
  const handleShowCountry = (country) => {
    setShowCountry(country);
    console.log('inside handle', { country });
  };

  const filteredCountries = countries
    ?
    countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    : null;

  return (
    <div>
      <div>
        <form>
          Find countries :
          <input type="text" onChange={handleCountrySearch} />
        </form>
      </div>
      <Countries countries={filteredCountries} handleShowCountry={handleShowCountry} showCountry={showCountry} />

    </div>
  );
};

export default App;
