import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Pokemon Search</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
