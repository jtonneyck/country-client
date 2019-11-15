import React, {useState, useEffect} from 'react';
import axios from "axios";

function App() {

  const [countries, setCountries] = useState({
    filtered: [],
    all: []
  })

  const [search, setSearch] = useState("");
  const [error, setError] = useState({});

  function handleSearch(e){
    let filtered = countries.all.filter((country)=> country.name.common.toLowerCase().indexOf(e.target.value) !== -1)
    setCountries({filtered, all: countries.all})
    setSearch(e.target.value)
  }

  useEffect(()=> {
    axios({
      url: `${process.env.REACT_APP_API_HOST}/countries`,
      method: "GET"
    })
    .then(({data})=> {
      setCountries({filtered: data, all: data})
    })
    .catch((error)=> {
      setError({error})
    })
  },[])

  return (
    <div className="App">
      <input type="text" onChange={handleSearch} value={search}/>
      {countries.filtered.map((country)=> 
        <p>{country.name.common}</p>  
      )}
    </div>
  );
}

export default App;
