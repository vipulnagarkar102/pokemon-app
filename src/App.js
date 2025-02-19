// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
      const data = response.data.results;
      const detailedData = await Promise.all(
        data.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );
      setPokemonData(detailedData);
      setFilteredData(detailedData);
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    const filtered = pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  }, [query, pokemonData]);

  return (
    <div className="App">
      <SearchBar query={query} setQuery={setQuery} />
      <div className="pokemon-list">
        {filteredData.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
