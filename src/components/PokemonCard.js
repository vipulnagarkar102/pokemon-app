// src/PokemonCard.js
import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
    </div>
  );
};

export default PokemonCard;
